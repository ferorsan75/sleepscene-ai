import type { ImagePromptContract } from "@/contracts/ImagePromptContract";
import { generateJsonFromPrompt } from "@/ai/OpenAIGateway";
import {
  buildImagePromptsPrompt,
  type BuildImagePromptsInput,
} from "@/prompts/ImagePromptBuilder";
import { parseImagePromptsResponse } from "@/services/ImagePromptService";

export async function generateImagePrompts(
  input: BuildImagePromptsInput,
): Promise<ImagePromptContract[]> {
  const prompt = buildImagePromptsPrompt(input);
  const rawResponse = await generateJsonFromPrompt(prompt);

  return parseImagePromptsResponse(rawResponse);
}
