import { AUTH_SERVICE_ROUTE } from "."
import client from ".."
import type { ApiResult, SignupPayload, User } from "./types"

const SIGNUP_ROUTE = AUTH_SERVICE_ROUTE + "/register"

/**
 * Registers a new user account.
 * Resolves with the api result on 201, rejects with an AxiosError otherwise (e.g. 409 email in use).
 */
export const signup = async (payload: SignupPayload): Promise<ApiResult<User>> => {
  const response = await client.post<ApiResult<User>>(SIGNUP_ROUTE, payload)
  return response.data
}