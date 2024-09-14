import React, { useEffect, useState } from 'react'



function Product() {
    const [data, setData] = useState([])

    const getProduct = async () => {
        const responce = await fetch('https://dummyjson.com/product');
        const data = await responce.json()
        setData(data.products)
    }


    useEffect(
        () => {
            getProduct()
        },
        []
    )

    return (
        <div className='container'>
            {
                data.map(
                    (d, i) => {
                        return <div key={i} className='box'>
                            <img src={d.thumbnail} alt="" />
                            <h3>{d.price}$</h3>
                            <p>{d.description}</p>
                        </div>
                    }
                )
            }
        </div>
    )
}

export default Product
