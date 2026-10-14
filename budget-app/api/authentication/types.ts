/**
 * Shared types for the authentication api handlers.
 * Mirrors the DTOs / Result<T> shape returned by the budget api.
 */

export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePictureUrl?: string | null
  isActive: boolean
}

export interface ApiResult<TData> {
  data?: TData | null
  isSuccess: boolean
  exception?: string | null
}

export interface LoginResponse {
  token?: string
}
