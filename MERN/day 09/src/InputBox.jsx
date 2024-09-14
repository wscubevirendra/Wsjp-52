import React from 'react'

export default function InputBox({setSearch}) {
  return (
    <input onKeyUp={(e)=>{setSearch(e.target.value)}} type="text" className="form-control px-4" placeholder='Movies Search krna hai...' aria-label="Dollar amount (with dot and two decimal places)"/>
  )
}
