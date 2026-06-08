import { NextResponse } from "next/server";
import { generateStoryBible } from "@/ai/StoryBibleGenerator";
import { generateStory } from "@/ai/StoryGenerator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storyBible = await generateStoryBible(body);
    const story = await generateStory(storyBible);

    return NextResponse.json({
      storyBible,
      story,
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
