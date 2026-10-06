/**
 * Contains both the fulfilled and rejected interceptors
 * 
 * The fulfilled interceptor appends the auth token to the header of the request if present.
 * The reject interceptor simply rejects.
 */

import type { InternalAxiosRequestConfig } from "axios"

// on auth fulfilled
export const attachAuthHeader = (
	config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
	// retrieve the saved auth token from local storage
  const token = localStorage.getItem('token');
  
  // if the token is present, append the token to the headers
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // return the options
  return config
}