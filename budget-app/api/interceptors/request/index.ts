export * from "./authentication"

// on rejected
export const handleRequestRejected = (error: unknown): Promise<never> => {
  return Promise.reject(error)
}