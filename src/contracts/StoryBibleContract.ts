import { z } from "zod";

export const StoryBibleContractSchema = z.object({
  schemaVersion: z.literal("1.0"),
  protagonist: z.object({
    name: z.string().min(1),
    age: z.number(),
    description: z.string(),
  }),
  companion: z
    .object({
      name: z.string(),
      description: z.string(),
      role: z.string(),
    })
    .optional(),
  theme: z.string().min(1),
  visualStyle: z.string().min(1),
  narrativeStyle: z.string().min(1),
  locations: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
});

export type StoryBibleContract = z.infer<typeof StoryBibleContractSchema>;
