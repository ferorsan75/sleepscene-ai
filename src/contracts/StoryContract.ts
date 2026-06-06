import { z } from "zod";

const StorySceneSchema = z.object({
  sceneNumber: z.number().int().min(1).max(5),
  title: z.string().min(1),
  narrativeText: z.string().min(1),
  durationSeconds: z.number().min(45).max(75),
});

export const StoryContractSchema = z.object({
  schemaVersion: z.literal("1.0"),
  title: z.string().min(1),
  summary: z.string().min(1),
  durationSeconds: z.literal(300),
  scenes: z.array(StorySceneSchema).length(5),
});

export type StoryContract = z.infer<typeof StoryContractSchema>;
