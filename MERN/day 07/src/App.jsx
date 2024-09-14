import React, { useState } from 'react'
import Input from './Input'
import Display from './Display'

export default function App() {
  const [Item, setItem] = useState([])


  function setItemHandler(value) {
    setItem([...Item, value])
  }

  function deleteItem(indexNumber) {
    const newArr = Item.filter(
      (data, index) => {
        //index == indexNumber ? false : true
        if (index == indexNumber) {
          return false
        } else {
          return true
        }
      }
    )

  
    setItem(newArr)
  }


  return (
    <div className='w-50 border  mx-auto p-2'>
      <Input setItemHandler={setItemHandler} />
      <Display data={Item} deleteItem={deleteItem} />
    </div>
  )
}
