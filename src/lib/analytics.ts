/**
 * Telemetry and Analytics Event Tracker
 * Funnel tracking for page views, authentication, checkout, and lesson completion events.
 */

export type FunnelEvent =
  | "pageview"
  | "login_success"
  | "register_success"
  | "checkout_started"
  | "payment_completed"
  | "lesson_completed"
  | "admin_action";

export function trackEvent(eventName: FunnelEvent, payload?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // Client-side analytics dispatch
    console.log(`[Analytics Event] ${eventName}:`, payload);
  }
}
