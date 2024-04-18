export function errorHandler(error: unknown) {
  if (error instanceof Error) {
    return {
      ok: false,
      message: error.message,
    };
  } else {
    return {
      ok: false,
      message: "unknown error",
    };
  }
}
