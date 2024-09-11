import React, { useState } from 'react'
import Input from './Input'
import Display from './Display'

export default function App() {
  const [Item, setItem] = useState([])


  function setItemHandler(value) {
    setItem([...Item, value])
  }


  return (
    <div className='w-50 border  mx-auto p-2'>
      <Input setItemHandler={setItemHandler} />
     
      <Display data={Item} />
    </div>
  )
}
