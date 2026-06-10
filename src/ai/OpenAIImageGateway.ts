import { openai } from "@/lib/openai/client";

export async function generateImageFromPrompt(
  prompt: string,
): Promise<unknown> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required to generate images.");
  }

  if (!process.env.OPENAI_IMAGE_MODEL) {
    throw new Error("OPENAI_IMAGE_MODEL is required to generate images.");
  }

  return openai.images.generate({
    model: process.env.OPENAI_IMAGE_MODEL,
    prompt,
    n: 1,
    output_format: "png",
    size: "1024x1536",
  });
}
