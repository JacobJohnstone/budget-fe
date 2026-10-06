/**
 * Contains both the fulfilled and rejected interceptors
 * 
 * The fulfilled interceptor appends the auth token to the header of the request if present.
 * The reject interceptor simply rejects.
 */


// on rejected
const authRejected = (error: unknown): Promise<never> => {
  return Promise.reject(error)
}