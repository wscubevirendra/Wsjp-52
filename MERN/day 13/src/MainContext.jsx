import React, { createContext, useState } from 'react'
const context = createContext()

function MainContext(props) {
    const [count, setcount] = useState(0);
    const inc = () => setcount(count + 1);
    const dec = () => setcount(count - 1);
    return (
        <context.Provider value={{ count, inc, dec }}>
            {props.children}
        </context.Provider>
    )
}

export default MainContext
export { context }
