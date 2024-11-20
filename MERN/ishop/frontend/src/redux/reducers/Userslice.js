import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        token: null
    },
    reducers: {
        login: (state, current) => {
            state.data = current.payload.data
            state.token = current.payload.token
            localStorage.setItem("user", JSON.stringify(current.payload.data))
            localStorage.setItem("user-token", current.payload.token)
        },
        logout: (state, current) => {
            state.data = null
            localStorage.removeItem("user");
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer