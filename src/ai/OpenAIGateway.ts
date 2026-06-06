import { openai } from "@/lib/openai/client";

export async function generateJsonFromPrompt(prompt: string): Promise<unknown> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required to generate AI responses.");
  }

  if (!process.env.OPENAI_MODEL) {
    throw new Error("OPENAI_MODEL is required to generate AI responses.");
  }

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL,
    input: prompt,
    text: {
      format: {
        type: "json_object",
      },
    },
  });

  if (!response.output_text) {
    throw new Error("OpenAI response did not include JSON output text.");
  }

  try {
    return JSON.parse(response.output_text) as unknown;
  } catch {
    throw new Error("OpenAI response was not valid JSON.");
  }
}
