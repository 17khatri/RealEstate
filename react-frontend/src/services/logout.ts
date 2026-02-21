import { store } from "../store"
import { clearUser } from "../store/authSlice"
import { removeToken } from "./authService"

export const logout = () => {
    removeToken()
    store.dispatch(clearUser())
}