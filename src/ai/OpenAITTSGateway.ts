import { openai } from "@/lib/openai/client";

const NARRATION_INSTRUCTIONS =
  "Narrate as a bedtime story with a calm pace, a warm tone, gentle language, and natural pauses.";

export async function generateNarrationFromText(
  text: string,
): Promise<unknown> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required to generate narration.");
  }

  if (!process.env.OPENAI_TTS_MODEL) {
    throw new Error("OPENAI_TTS_MODEL is required to generate narration.");
  }

  if (!process.env.OPENAI_TTS_VOICE) {
    throw new Error("OPENAI_TTS_VOICE is required to generate narration.");
  }

  const response = await openai.audio.speech.create({
    model: process.env.OPENAI_TTS_MODEL,
    voice: process.env.OPENAI_TTS_VOICE,
    input: text,
    instructions: NARRATION_INSTRUCTIONS,
    response_format: "mp3",
  });

  return response.arrayBuffer();
}
