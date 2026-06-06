import {
  StoryContractSchema,
  type StoryContract,
} from "@/contracts/StoryContract";

export function parseStoryResponse(input: unknown): StoryContract {
  const result = StoryContractSchema.safeParse(input);

  if (!result.success) {
    throw new Error(
      `Invalid StoryContract: ${result.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ")}`,
    );
  }

  return result.data;
}
