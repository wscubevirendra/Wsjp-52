import { createSlice } from '@reduxjs/toolkit'


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        original_price: 0,
        total: 0
    },
    reducers: {
        addToCart: (state, { payload }) => {
         
            const product = state.data.find((p) => p.product_id == payload.product_id)
            if (product) {
                product.qty++
            } else {
                state.data.push({ product_id: payload.product_id, qty: 1 })
            }

            state.total += Number(payload.price)
            state.original_price += Number(payload.original_price)
            localStorage.setItem("cartItem", JSON.stringify(state.data));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("original_price", JSON.stringify(state.original_price));
        },
        dbToCart(state, action) {
          
            state.data = action.payload.data;
            state.total = action.payload.total;
            state.original_price = action.payload.original_price;
            localStorage.setItem("cartItem", JSON.stringify(state.data));
            localStorage.setItem("total", state.total);
            localStorage.setItem("original_price", state.original_price);
        },
        removeToCart: (state, { payload }) => {

        },

        addQty: (state, { payload }) => {

        },
        lsCartUpdate: (state, { payload }) => {
            const cartItem = localStorage.getItem("cartItem")
            const total = localStorage.getItem("total")
            const original_price = localStorage.getItem("original_price")
            if (cartItem != null) {
                state.data = JSON.parse(cartItem);
                state.total = Number(total)
                state.original_price = Number(original_price)
            }

        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeToCart, addQty, lsCartUpdate, dbToCart } = cartSlice.actions

export default cartSlice.reducer