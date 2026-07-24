/**
 * Sentry Error Monitoring & Exception Handling Wrapper
 * Handles exception capture and sensitive credential redaction.
 */

export function captureException(error: unknown, context?: Record<string, any>) {
  const sanitizedContext = context ? redactSensitiveData(context) : {};
  console.error("[Sentry Exception Captured]:", error, sanitizedContext);
}

export function redactSensitiveData(data: Record<string, any>): Record<string, any> {
  const sensitiveKeys = ["password", "passwordhash", "serverkey", "secret", "token"];
  const redacted = { ...data };

  for (const key of Object.keys(redacted)) {
    if (sensitiveKeys.some((k) => key.toLowerCase().includes(k))) {
      redacted[key] = "[REDACTED]";
    }
  }

  return redacted;
}
