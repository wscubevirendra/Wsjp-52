import React, { useEffect, useState } from 'react'

export default function App() {

  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(0)

  const inc = () => {
    setCount(count + 1)

  }


  const decs = () => {
    setCount(count - 1)

  }


  useEffect(
    () => {
      setPrice(count * 500)
    },
    [count]
  )



  return (
    <div className='box'>
      <button onClick={inc}>+</button>
      <h1>Count is {count}</h1>
      <h1> Price is {price}</h1>
      <button onClick={decs}>-</button>
    </div>
  )
}
