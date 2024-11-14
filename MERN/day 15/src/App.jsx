import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './redux/reducer/counterSlice'

export default function App() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  return (
    <div className='box'>
      <button onClick={() => dispatch(increment())}>+</button>
      <h1>{counter}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
