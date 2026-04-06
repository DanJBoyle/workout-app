import { Toast } from "react-native-toast-message/lib/src/Toast";

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function parseError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "An unexpected error occurred";
}

export function showToastError(err: unknown) {
  const message = parseError(err);
  const code = err instanceof AppError ? err.code : undefined;

  Toast.show({
    type: "error",
    text1: code ? `Error: ${code}` : "Error",
    text2: message,
  });
}
