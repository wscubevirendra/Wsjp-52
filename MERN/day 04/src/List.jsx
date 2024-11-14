import React, { useState } from 'react'

function List(props) {
    const [count, setcount] = useState(0);
    const [toggle, settoggle] = useState(false);

    const toggleHandler = () => {
        settoggle(!toggle)
    }

    const inc = () => {
        setcount(count + 1)
    }

    const dec = () => {
        setcount(count - 1)
    }


    return (
        <div style={{ background: toggle == true ? "red" : "green" ,color:"white"}} className="box">
            <button onClick={toggleHandler}>
                {
                    toggle == true ? 'On' : 'off'
                }
            </button>
            <button disabled={count >= 10 ? true : false} onClick={inc}>+</button>
            <h1>{count}</h1>
            <button disabled={count == 0 ? true : false} onClick={dec}>-</button>
            <h1>₹:-{count * props.prize}</h1>
            <input type="checkbox" />
        </div>

    )
}

export default List;
