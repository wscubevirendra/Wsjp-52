import React, { useContext } from 'react'
import Y from './Y'
import { context } from '../MainContext'

export default function X() {

    const { dec } = useContext(context)
    return (
        <div>X
            <button onClick={dec}>-</button>
            <Y />
        </div>
    )
}
