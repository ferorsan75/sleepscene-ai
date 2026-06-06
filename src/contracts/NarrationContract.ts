import { z } from "zod";

export const NarrationContractSchema = z.object({
  schemaVersion: z.literal("1.0"),
  sceneNumber: z.number().int().min(1).max(5),
  narrationText: z.string().min(1),
});

export type NarrationContract = z.infer<typeof NarrationContractSchema>;
