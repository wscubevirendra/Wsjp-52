import React, { useContext } from 'react'
import { context } from '../MainContext'


export default function Z() {
    const { inc } = useContext(context)
    return (
        <div>Z
            <button onClick={inc}>+</button>
        </div>
    )
}
