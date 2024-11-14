import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: null,
    },
    reducers: {
        login: (state) => {

        },
        logout: (state) => {

        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = adminSlice.actions

export default adminSlice.reducer