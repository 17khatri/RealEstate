import { apiClient } from "./apiClient"

interface LoginPayload {
    user_email: string
    user_password: string
}

interface LoginResponse {
    data: {
        token: string
        user: {
            user_id: string
            user_name: string
            role: string
            user_email: string
            token: string
        }
    }
}

export const loginApi = (data: LoginPayload) =>
    apiClient<LoginResponse>({
        method: "POST",
        url: "/login",
        data,
    })