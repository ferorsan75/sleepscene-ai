import { z } from "zod";

export interface GeneratedImage {
  sceneNumber: number;
  imageBase64: string;
  mimeType: string;
}

const GeneratedImageResponseSchema = z.object({
  data: z.array(
    z.object({
      b64_json: z.string().min(1),
    }),
  ),
});

export function parseGeneratedImageResponse(
  sceneNumber: number,
  input: unknown,
): GeneratedImage {
  const result = GeneratedImageResponseSchema.safeParse(input);
  const imageBase64 = result.success ? result.data.data[0]?.b64_json : undefined;

  if (!imageBase64) {
    throw new Error(
      `OpenAI image response for scene ${sceneNumber} did not include base64 image data.`,
    );
  }

  return {
    sceneNumber,
    imageBase64,
    mimeType: "image/png",
  };
}
