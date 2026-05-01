// utils/extractSkills.js

import { SKILLS } from "./skills.js";

// escape regex special characters
const escapeRegex = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const extractSkills = (input) => {
    const foundSkills = new Set();

    // normalize input → always work with string
    const text = Array.isArray(input)
        ? input.join(" ").toLowerCase()
        : input.toLowerCase();

    for (const skill of SKILLS) {
        const lowerSkill = skill.toLowerCase();

        // handle special symbol skills separately (c++, c#, etc.)
        if (/[+#]/.test(lowerSkill)) {
            if (text.includes(lowerSkill)) {
                foundSkills.add(skill);
            }
            continue;
        }

        // safe regex
        const safeSkill = escapeRegex(lowerSkill);
        const pattern = new RegExp(`\\b${safeSkill}\\b`, "i");

        if (pattern.test(text)) {
            foundSkills.add(skill);
        }
    }

    return Array.from(foundSkills);
};