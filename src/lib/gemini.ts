import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export const aiSummarizeCommit = async (diff: string) => {
  const prompt = `You are an expert programmer. Summarize the git diff that follows.

Instructions (output requirements):
- Return a short bullet list (use "* " at the start of each line). Maximum 6 bullets.
- Each bullet should be concise (one short sentence, 6–20 words) describing the intent of the change (bugfix, feature, refactor, test, docs, config, etc.).
- If the commit touches 1 or 2 files, include the filename(s) in square brackets at the end of the bullet, e.g. [src/foo.ts]. If it touches more than 2 files, omit file paths.
- Do not include code, code snippets, or diff lines in the summary.
- Do not repeat any example text; use only the diff below as source information.
- If the change is trivial (typo/formatting), return a single bullet starting with "Minor:" and a short note.

Now summarize the following git diff:
\n${diff}
`;

  // Call the Gemini API and return the first text candidate as the summary
  const resp = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });

  // The API response shape may vary; prefer common fields and fallback to JSON
  const text = resp.candidates?.[0]?.content?.parts?.[0]?.text ?? 
    JSON.stringify(resp);

  return text.trim();
}

// console.log(await summarizeCommit(`
//   diff --git a/prisma/schema.prisma b/prisma/schema.prisma
// index 3c083b8..f100414 100644
// --- a/prisma/schema.prisma
// +++ b/prisma/schema.prisma
// @@ -3,6 +3,9 @@
 
//  generator client {
//      provider = "prisma-client-js"
// +    // Include the runtime required by the dev container (debian-openssl-3.0.x)
// +    // Keep native so local systems still work.
// +    binaryTargets = ["native", "debian-openssl-3.0.x"]
//  }
 
//  datasource db {  
// `))