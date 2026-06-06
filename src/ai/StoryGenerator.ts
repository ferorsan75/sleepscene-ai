import type { StoryBibleContract } from "@/contracts/StoryBibleContract";
import type { StoryContract } from "@/contracts/StoryContract";
import { generateJsonFromPrompt } from "@/ai/OpenAIGateway";
import { buildStoryPrompt } from "@/prompts/StoryPromptBuilder";
import { parseStoryResponse } from "@/services/StoryService";

export async function generateStory(
  storyBible: StoryBibleContract,
): Promise<StoryContract> {
  const prompt = buildStoryPrompt({ storyBible });
  const rawResponse = await generateJsonFromPrompt(prompt);

  return parseStoryResponse(rawResponse);
}
