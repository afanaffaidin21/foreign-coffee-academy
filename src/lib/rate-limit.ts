/**
 * In-Memory API Rate Limiter
 * Limits rapid repetitive requests from single client IP addresses.
 */

const requestCounts = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string, limit: number = 60, windowMs: number = 60000): boolean {
  const now = Date.now();
  const current = requestCounts.get(ip);

  if (!current || current.expiresAt < now) {
    requestCounts.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}
