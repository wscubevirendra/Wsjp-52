import React from 'react'

export default function Input(props) {

  function getItem(e) {
    if (e.key == "Enter") {
      props.setItemHandler(e.target.value)
      e.target.value = ""
    }
  }


  return (

    <input onKeyUp={getItem} className='w-100  mb-4' type="text" />
  )
}
