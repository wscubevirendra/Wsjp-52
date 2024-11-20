import { createSlice } from '@reduxjs/toolkit'


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null,
        token: null
    },
    reducers: {
        login: (state, current) => {
            state.data = current.payload.data
            state.token = current.payload.token
            localStorage.setItem("admin", JSON.stringify(current.payload.data))
            localStorage.setItem("admin-token", current.payload.token)
        },
        logout: (state, current) => {
            state.data = null
            localStorage.removeItem("admin");
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = adminSlice.actions

export default adminSlice.reducer