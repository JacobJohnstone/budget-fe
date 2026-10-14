import { AUTH_SERVICE_ROUTE } from "."
import client from ".."

const LOGOUT_ROUTE = AUTH_SERVICE_ROUTE + "/logout"

/**
 * Logs the current user out. The local token is always cleared, even if the request fails.
 */
export const logout = async (): Promise<void> => {
  try {
    await client.post(LOGOUT_ROUTE)
  } finally {
    localStorage.removeItem("token")
  }
}