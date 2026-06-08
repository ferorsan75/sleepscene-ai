import type { StoryContract } from "@/contracts/StoryContract";

export interface BuildImagePromptsInput {
  story: StoryContract;
  visualStyle: string;
}

export function buildImagePromptsPrompt(
  input: BuildImagePromptsInput,
): string {
  return `You are the Image Prompt Generator for SleepScene AI.

Return only valid JSON. Do not include markdown, comments, prose, or code fences.

The JSON must have this shape:
{
  "prompts": [
    {
      "schemaVersion": "1.0",
      "sceneNumber": 1,
      "aspectRatio": "9:16",
      "visualStyle": "non-empty string",
      "prompt": "non-empty string"
    }
  ]
}

Rules:
- Generate one visual prompt for each scene in the story.
- Use the matching sceneNumber from each scene.
- aspectRatio must always be exactly "9:16".
- visualStyle must be non-empty and must use the provided visualStyle.
- prompt must be non-empty.
- Keep visual consistency across all scenes.
- Images must be appropriate for children and bedtime.
- Do not include written text inside the images.
- Do not generate scary, violent, graphic, bloody, or inappropriate content.
- Each prompt must describe the protagonist, companion when present, environment, main action, and visual style.

Input:
${JSON.stringify(input, null, 2)}`;
}
