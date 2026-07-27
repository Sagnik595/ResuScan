import { jd } from "../models/JDModel.js";
import { Mock } from "../models/MockIntModel.js";
import { Resume } from "../models/resumeModel.js";
import { user } from "../models/userModel.js";


//API to generate interview questions

const generateQues = async (req, res) => {
  try {
    const uid = req.userID;
    const userName = await user.findByID(uid).name;
    const userEmail = await user.findByID(uid).email;

    const resumeDoc = await Resume.findOne({ userId: uid });
    const jdDoc = await jd.findById(req.jobID);

    // extract plain text since schema stores ResumeContent / JDContent as String
    const ResumeContent =
      resumeDoc?.parsedText || resumeDoc?.text || JSON.stringify(resumeDoc);
    const JDContent =
      jdDoc?.description || jdDoc?.text || JSON.stringify(jdDoc);

    // generating the interview questions
    const client = new Groq({
      apiKey: process.env.GROQ_INTERVIEW,
    });

    const QuestionPrompt = `
You are an experienced technical interviewer and hiring manager. Using the candidate's resume and the job description below, generate a mock interview question set.
 
RESUME:
${ResumeContent}
 
JOB DESCRIPTION:
${JDContent}
 
Generate exactly 15 interview questions in a single flat list, in this exact order:
- Questions 1-10: Technical questions based on the skills, tools, and technologies that overlap between the resume and job description. Match difficulty to the seniority level implied by the resume. Include a mix of conceptual, applied/scenario-based, and at least 1-2 problem-solving or case-study style questions relevant to the domain. Ground some questions in specific projects mentioned in the resume.
- Questions 11-15: Non-technical HR questions, all situation-based (STAR-style), covering areas like conflict resolution, handling failure, prioritization under pressure, ownership/leadership, and collaboration. Personalize at least 1-2 using specifics from the resume.
 
Each question should be a plain, self-contained string with no numbering, no labels, and no markdown.
 
Respond with ONLY valid JSON, no markdown formatting, no code fences, no explanation text before or after. Use exactly this structure:
 
{
  "questions": ["string", "string", "... exactly 15 strings total"]
}
`;

    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: QuestionPrompt }],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      response_format: { type: "json_object" }, // enforces valid JSON if supported by the model/provider
    });

    const rawResponse = chatCompletion.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(rawResponse);
    } catch (parseErr) {
      const cleaned = rawResponse.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    const IntQuestions = parsed.questions;

    if (!Array.isArray(IntQuestions) || IntQuestions.length !== 15) {
      return res.json({
        success: false,
        message:
          "Question generation failed: expected 15 questions, got a malformed response.",
      });
    }

    const fullData = await Mock.create({
      userID: uid,
      userName,
      userEmail,
      ResumeContent,
      JDContent,
      IntQuestions,
    });

    return res.json({ success: true, data: fullData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default generateQues;



