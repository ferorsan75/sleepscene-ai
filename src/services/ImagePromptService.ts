import { z } from "zod";
import {
  ImagePromptContractSchema,
  type ImagePromptContract,
} from "@/contracts/ImagePromptContract";

const ImagePromptsResponseSchema = z.object({
  prompts: z.array(ImagePromptContractSchema),
});

export function parseImagePromptsResponse(
  input: unknown,
): ImagePromptContract[] {
  const result = ImagePromptsResponseSchema.safeParse(input);

  if (!result.success) {
    throw new Error(
      `Invalid ImagePromptContract response: ${result.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ")}`,
    );
  }

  return result.data.prompts;
}
