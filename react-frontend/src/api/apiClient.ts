import { axiosInstance } from "./axiosInstance"
import type { AxiosRequestConfig } from "axios"

export const apiClient = async <T = unknown>(
    config: AxiosRequestConfig
): Promise<T> => {
    const response = await axiosInstance(config)
    return response.data
}