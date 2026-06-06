export interface BuildStoryBiblePromptInput {
  childName: string;
  childAge: number;
  interests: string[];
  theme: string;
  visualStyle: string;
  narrativeStyle: string;
}

export function buildStoryBiblePrompt(
  input: BuildStoryBiblePromptInput,
): string {
  return `You are the Story Bible Generator for SleepScene AI.

Return only valid JSON. Do not include markdown, comments, prose, or code fences.

The JSON must be compatible with StoryBibleContract:
{
  "schemaVersion": "1.0",
  "protagonist": {
    "name": "non-empty string",
    "age": number,
    "description": "string"
  },
  "companion": {
    "name": "string",
    "description": "string",
    "role": "string"
  },
  "theme": "non-empty string",
  "visualStyle": "non-empty string",
  "narrativeStyle": "non-empty string",
  "locations": [
    {
      "name": "string",
      "description": "string"
    }
  ]
}

Required fields are schemaVersion, protagonist, theme, visualStyle, and narrativeStyle.
schemaVersion must be exactly "1.0".
protagonist.name, theme, visualStyle, and narrativeStyle must be non-empty strings.
The child is always the protagonist.
The companion must support the child and must not replace the child's protagonism.

Input:
${JSON.stringify(input, null, 2)}`;
}
