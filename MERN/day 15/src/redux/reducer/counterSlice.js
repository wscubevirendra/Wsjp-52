import { createSlice } from '@reduxjs/toolkit'



export const counterSlice = createSlice({
    name: 'counter',
    initialState: 10,
    reducers: {
        increment(state) {
            state += 1
        },
        decrement(state) {
            state -= 1

        }


    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer