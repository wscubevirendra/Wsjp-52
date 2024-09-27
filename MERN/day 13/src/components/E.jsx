import React, { useContext } from 'react'
import { context } from '../MainContext'

export default function E() {
    const { count } = useContext(context)
    return (
        <div>E :-{count}</div>
    )
}
