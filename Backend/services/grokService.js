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

  const chat = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "openai/gpt-oss-20b",
  });

  console.log(chat.choices[0]?.message?.content || "");

  const finalText = (chat.choices[0]?.message?.content || "").trim();
  const jsonMatch = finalText.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch[0]);
}
