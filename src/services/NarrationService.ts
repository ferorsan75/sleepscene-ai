export interface GeneratedNarration {
  mimeType: string;
  audioBase64: string;
}

export function parseGeneratedNarrationResponse(
  input: unknown,
): GeneratedNarration {
  if (!(input instanceof ArrayBuffer) || input.byteLength === 0) {
    throw new Error("OpenAI TTS response did not include audio data.");
  }

  return {
    mimeType: "audio/mpeg",
    audioBase64: Buffer.from(input).toString("base64"),
  };
}
