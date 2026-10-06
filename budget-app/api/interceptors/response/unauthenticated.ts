/**
 * Contains both the fulfilled and rejected response interceptors.
 *
 * The fulfilled interceptor passes the response through.
 * The rejected interceptor handles unauthenticated (401) responses.
 */

import axios from "axios"

// on response rejected
export const handleUnauthenticatedError = (error: unknown): Promise<never> => {
  // if the server returns a 401, clear the locally stored token
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    localStorage.removeItem("token")
  }

  return Promise.reject(error)
}
