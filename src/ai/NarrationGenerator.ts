import type { StoryContract } from "@/contracts/StoryContract";
import { generateNarrationFromText } from "@/ai/OpenAITTSGateway";
import {
  parseGeneratedNarrationResponse,
  type GeneratedNarration,
} from "@/services/NarrationService";

export async function generateNarration(
  story: StoryContract,
): Promise<GeneratedNarration> {
  const sceneTexts = [...story.scenes]
    .sort((first, second) => first.sceneNumber - second.sceneNumber)
    .map((scene) => scene.narrativeText);
  const narrationText = [story.title, ...sceneTexts].join("\n\n");
  const rawResponse = await generateNarrationFromText(narrationText);

  return parseGeneratedNarrationResponse(rawResponse);
}
