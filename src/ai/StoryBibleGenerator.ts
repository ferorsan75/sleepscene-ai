import type { StoryBibleContract } from "@/contracts/StoryBibleContract";
import { generateJsonFromPrompt } from "@/ai/OpenAIGateway";
import {
  buildStoryBiblePrompt,
  type BuildStoryBiblePromptInput,
} from "@/prompts/StoryBiblePromptBuilder";
import { parseStoryBibleResponse } from "@/services/StoryBibleService";

export async function generateStoryBible(
  input: BuildStoryBiblePromptInput,
): Promise<StoryBibleContract> {
  const prompt = buildStoryBiblePrompt(input);
  const rawResponse = await generateJsonFromPrompt(prompt);

  return parseStoryBibleResponse(rawResponse);
}
