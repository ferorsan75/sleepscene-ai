import { openai } from "@/lib/openai/client";

const NARRATION_INSTRUCTIONS =
  "Narre em português brasileiro, com pronúncia natural do Brasil, como um contador de histórias falando para uma criança na hora de dormir. Use um ritmo calmo e um pouco mais lento, com tom acolhedor, carinhoso e tranquilizador. Faça pausas naturais entre frases e momentos importantes. Evite um tom energético, acelerado ou comercial. Mantenha a voz suave e relaxante, adequada para induzir o sono.";

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
