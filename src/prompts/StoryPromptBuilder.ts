import type { StoryBibleContract } from "@/contracts/StoryBibleContract";

export interface BuildStoryPromptInput {
  storyBible: StoryBibleContract;
}

export function buildStoryPrompt(input: BuildStoryPromptInput): string {
  return `You are the Story Generator for SleepScene AI.

Return only valid JSON. Do not include markdown, comments, prose, or code fences.

The JSON must be compatible with StoryContract:
{
  "schemaVersion": "1.0",
  "title": "non-empty string",
  "summary": "non-empty string",
  "durationSeconds": 300,
  "scenes": [
    {
      "sceneNumber": 1,
      "title": "non-empty string",
      "narrativeText": "non-empty string",
      "durationSeconds": 60
    }
  ]
}

Rules:
- schemaVersion must be exactly "1.0".
- durationSeconds must be exactly 300.
- scenes must contain exactly 5 elements.
- Each scene must have sceneNumber from 1 to 5.
- Each scene must have a non-empty title.
- Each scene must have non-empty narrativeText.
- Each scene must have durationSeconds between 45 and 75.
- The story must be one continuous bedtime narrative, not five independent stories.
- The child from the StoryBible is always the protagonist.

StoryBible:
${JSON.stringify(input.storyBible, null, 2)}`;
}
