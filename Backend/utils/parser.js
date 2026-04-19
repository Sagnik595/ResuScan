import fs from "fs";
import pkg from "pdf-parse";

const pdf = pkg;

export const parsePDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        return data.text; // raw extracted text

    } catch (err) {
        throw new Error("PDF parsing failed: " + err.message);
    }
};