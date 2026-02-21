import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user_id: string | null
    user_email: string | null
    user_name: string | null
    role: string | null
    token: string | null
}

const initialState: UserState = {
    user_id: null,
    user_email: null,
    user_name: null,
    role: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ email: string; role: string, id?: string, name?: string, token?: string }>
        ) => {
            state.user_email = action.payload.email
            state.role = action.payload.role
            state.token = localStorage.getItem("token")
            state.user_id = action.payload.id || null
            state.user_name = action.payload.name || null
        },
        clearUser: (state) => {
            state.user_email = null
            state.role = null
            state.token = null
            state.user_id = null
            state.user_name = null
        },
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer