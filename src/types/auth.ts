import type { User } from "./user"

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    phone: string
    password: string
}

export interface ForgotPasswordData {
    email: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface ApiError {
    message: string
    errors?: Record<string, string[]>
} 