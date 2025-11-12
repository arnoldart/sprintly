import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export const summarizeCommit = async (diff: string) => {
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
    model: 'gemini-1.5-flash',
    contents: prompt,
  });

  // The API response shape may vary; prefer common fields and fallback to JSON
  const r = resp as any;
  const summary = r?.candidates?.[0]?.content ?? r?.content ?? JSON.stringify(resp);
  return summary;
}

