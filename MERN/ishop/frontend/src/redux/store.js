import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './reducers/Adminslice'
import cartSlice from './reducers/Cartslice'
import userSlice from './reducers/Userslice'

export default configureStore({
    reducer: {
        admin: adminSlice,
        cart: cartSlice,
        user: userSlice,
    },
})