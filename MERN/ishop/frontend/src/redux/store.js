import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './reducers/Adminslice'

export default configureStore({
    reducer: {
        admin: adminSlice
    },
})