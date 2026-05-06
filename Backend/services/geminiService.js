import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fallback = () => ({
  skill_improvements: [],
  resume_improvements: [],
  project_suggestions: [],
  learning_roadmap: [],
});

export const getRecommendations = async ({
  resumeSkills,
  requiredSkills,
  missingSkills,
  matchScore,
}) => {
  try {
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

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = (
      response.candidates?.[0]?.content?.parts?.[0]?.text || ""
    ).trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) return fallback();

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return fallback();
    }
  } catch (error) {
    console.log("Gemini Error:", error);
    return fallback();
  }
};
