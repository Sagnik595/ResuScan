import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getGroqChatCompletion = async({
  resumeSkills,
  requiredSkills,
  missingSkills,
  matchScore,
})=> {

    const prompt = `
You MUST return ONLY valid JSON.

STRICTLY follow JSON format. Do not wrap in markdown.
No explanation. No extra text.

Format:
{
  "skill_improvements": [],
  "resume_improvements": [],
  "project_suggestions": [],
  "learning_roadmap": []
}

Rules:
- Max 5 items each
- Short actionable points

Candidate Skills: ${resumeSkills.join(", ")}
Required Skills: ${requiredSkills.join(", ")}
Missing Skills: ${missingSkills.join(", ")}
Match Score: ${matchScore}%
`;

  try {
    const chat = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const finalText = (chat.choices[0]?.message?.content || "").trim();
    
    if (!finalText) {
      throw new Error("Empty response from Groq API");
    }

    const jsonMatch = finalText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      // Return default recommendations
      return {
        skill_improvements: ["Learn the missing technical skills"],
        resume_improvements: ["Quantify achievements with metrics"],
        project_suggestions: ["Build projects using required technologies"],
        learning_roadmap: ["Follow structured learning path for growth"],
      };
    }
  } catch (error) {
    console.error("Groq API error:", error.message);
    throw new Error("Failed to generate AI recommendations");
  }
}
