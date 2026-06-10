import type { ImagePromptContract } from "@/contracts/ImagePromptContract";
import { generateImageFromPrompt } from "@/ai/OpenAIImageGateway";
import {
  parseGeneratedImageResponse,
  type GeneratedImage,
} from "@/services/ImageGenerationService";

export async function generateImage(
  prompt: ImagePromptContract,
): Promise<GeneratedImage> {
  const rawResponse = await generateImageFromPrompt(prompt.prompt);

  return parseGeneratedImageResponse(prompt.sceneNumber, rawResponse);
}

export async function generateImages(
  prompts: ImagePromptContract[],
): Promise<GeneratedImage[]> {
  return Promise.all(prompts.map(generateImage));
}
