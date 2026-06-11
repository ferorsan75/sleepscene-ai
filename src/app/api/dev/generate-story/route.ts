import { NextResponse } from "next/server";
import { generateImages } from "@/ai/ImageGenerator";
import { generateImagePrompts } from "@/ai/ImagePromptGenerator";
import { generateNarration } from "@/ai/NarrationGenerator";
import { generateStoryBible } from "@/ai/StoryBibleGenerator";
import { generateStory } from "@/ai/StoryGenerator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storyBible = await generateStoryBible(body);
    const story = await generateStory(storyBible);
    const imagePrompts = await generateImagePrompts({
      story,
      visualStyle: storyBible.visualStyle,
    });
    const images = await generateImages(imagePrompts);
    const narration = await generateNarration(story);

    return NextResponse.json({
      storyBible,
      story,
      imagePrompts,
      images,
      narration,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
