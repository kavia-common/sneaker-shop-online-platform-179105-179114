//
// Public configuration helpers for API access.
//
// Reads environment variables injected by CRA at build-time:
// - REACT_APP_API_BASE_URL: Base URL for backend API (e.g., https://api.example.com)
// - REACT_APP_USE_MOCKS: 'true' | 'false' to force using local mock data
//
// Do NOT hardcode configuration in code; set via .env at deployment.
//
// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /**
   * Returns the API base URL string from env, trimmed, or an empty string if not provided.
   */
  const raw = process.env.REACT_APP_API_BASE_URL || "";
  return String(raw).trim();
}

// PUBLIC_INTERFACE
export function getUseMocks() {
  /**
   * Returns true if mocks should be used. Mocks are used when:
   * - REACT_APP_USE_MOCKS is set to 'true' (case-insensitive), or
   * - API base URL is missing/empty.
   */
  const envFlag = String(process.env.REACT_APP_USE_MOCKS || "").toLowerCase();
  if (envFlag === "true") return true;
  if (envFlag === "false") return false;
  // Fallback to auto based on base URL presence
  return getApiBaseUrl() === "";
}
