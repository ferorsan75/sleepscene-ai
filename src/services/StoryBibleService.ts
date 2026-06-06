import {
  StoryBibleContractSchema,
  type StoryBibleContract,
} from "@/contracts/StoryBibleContract";

export function parseStoryBibleResponse(input: unknown): StoryBibleContract {
  const result = StoryBibleContractSchema.safeParse(input);

  if (!result.success) {
    throw new Error(
      `Invalid StoryBibleContract: ${result.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ")}`,
    );
  }

  return result.data;
}
