import React from 'react'
import data from './data/productData'


function Product() {

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
