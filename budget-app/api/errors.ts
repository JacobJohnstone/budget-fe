import axios from "axios"

const DEFAULT_ERROR = "Something went wrong. Please try again."

/**
 * Extracts a user-friendly message from an api error.
 * Handles plain string bodies (409), Result<T> bodies (400), and ASP.NET validation problem details.
 */
export const getErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) return DEFAULT_ERROR

  if (!error.response) return "Unable to reach the server. Please try again."

  const data = error.response.data

  if (typeof data === "string" && data.trim()) return data

  if (data && typeof data === "object") {
    if (typeof data.exception === "string" && data.exception) return data.exception

    if (data.errors && typeof data.errors === "object") {
      const messages = Object.values(data.errors as Record<string, string[]>).flat()
      if (messages.length) return messages.join(" ")
    }

    if (typeof data.title === "string" && data.title) return data.title
  }

  return DEFAULT_ERROR
}
