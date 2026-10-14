import client from ".."
import type { LoginPayload, LoginResponse } from "./types"

const LOGIN_ROUTE = "/api/v1/authentication/login"

/**
 * Logs a user in and persists the returned auth token (if any) for the request interceptor.
 */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse | "">(LOGIN_ROUTE, payload)

  // the api currently responds with an empty 200 body, so the token is optional
  const data = response.data || {}

  if (data.token) {
    localStorage.setItem("token", data.token)
  }

  return data
}