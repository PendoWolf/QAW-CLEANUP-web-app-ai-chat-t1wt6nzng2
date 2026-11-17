// The Pendo agent is loaded by the install snippet, so it may be missing at runtime.
interface PendoAgent {
  trackAgent: (eventType: "prompt" | "agent_response" | "user_reaction", metadata: object) => void;
}

interface Window {
  pendo?: PendoAgent;
}
