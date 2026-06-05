import { NextResponse } from "next/server";
import { openai } from "@/lib/openai/client";

export async function GET() {
  try {
    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: "Reply only with the word OK",
    });

    return NextResponse.json({
      success: true,
      response: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}