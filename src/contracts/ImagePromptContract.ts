import { z } from "zod";

export const ImagePromptContractSchema = z.object({
  schemaVersion: z.literal("1.0"),
  sceneNumber: z.number().int().min(1).max(5),
  aspectRatio: z.literal("9:16"),
  visualStyle: z.string().min(1),
  prompt: z.string().min(1),
});

export type ImagePromptContract = z.infer<typeof ImagePromptContractSchema>;
