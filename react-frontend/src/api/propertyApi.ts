import { axiosInstance } from "./axiosInstance"

export const getAllProperties = async () => {
    const response = await axiosInstance.get("/properties")
    return response.data
}