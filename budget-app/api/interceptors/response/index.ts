import { AxiosResponse } from "axios"

export * from "./unauthenticated"

// on response fulfilled
export const handleRequestFulfilled = (
  response: AxiosResponse,
): AxiosResponse => {
  return response
}