import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
const context = createContext()



export default function Maincontext(props) {
    const [products, setProducts] = useState([])
    const [cart, setcart] = useState([])


    useEffect(
        () => {
            axios.get('https://dummyjson.com/product')
                .then(
                    (succes) => {
                        //resolve
                        setProducts(succes.data.products)

                    }
                )
                .catch(
                    (err) => {
                        console.log(err)
                    }
                )
        }
        , []
    )



    const addToCart = (id) => {
        const cartPductCheck = cart.find((product) => product.id === id)

        if (!cartPductCheck) {
            const ProductCheck = products.find((product) => product.id === id)
            if (ProductCheck) {
                setcart([...cart, ProductCheck])
            }
        }
    }


    const removeFromCart = (id) => {
        const FilterOutProduct = cart.filter((item) => item.id !== id)
        setcart(FilterOutProduct)

    }


    return (
        <context.Provider value={{ addToCart, cart, removeFromCart }}>
            {
                props.children
            }
        </context.Provider>
    )
}


export { context }