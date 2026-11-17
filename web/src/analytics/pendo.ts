import { ApiError } from "../api/client";

// Pendo Track Events. The Pendo agent attaches the visitor and account itself, so
// properties only describe the event. Calls are no-ops until the agent has loaded.
type TrackProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    pendo?: {
      track?: (eventName: string, properties?: TrackProperties) => void;
    };
  }
}

/** Sends a Pendo Track Event, without letting a tracking failure break the app. */
export function trackEvent(eventName: string, properties: TrackProperties = {}): void {
  try {
    window.pendo?.track?.(eventName, properties);
  } catch {
    // Tracking must never interrupt the user's flow.
  }
}

/** The API status code behind a failed request, or 0 when the request never got an answer. */
export function errorStatus(error: unknown): number {
  return error instanceof ApiError ? error.status : 0;
}

/** The number of days a trip spans, counting the start and end days. */
export function tripLengthDays(startDate: string, endDate: string): number {
  const days = (Date.parse(endDate) - Date.parse(startDate)) / 86_400_000;
  return Number.isFinite(days) ? Math.round(days) + 1 : 0;
}
