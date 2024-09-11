import { useState } from 'react';
import Person from './Person'

function App() {
    const [data, setdata] = useState([
        {
            img: "https://plus.unsplash.com/premium_photo-1675130119382-6f891206f406?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            uname: "anurag",
            email: "anurag@gmail.com",
            age: 24

        }, {
            img: "https://plus.unsplash.com/premium_photo-1675129626614-7636908ebcf3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            uname: "mahesh",
            email: "mahesh@gmail.com",
            age: 30

        }, {
            img: "https://plus.unsplash.com/premium_photo-1675129626614-7636908ebcf3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            uname: "ankit",
            email: "ankit@gmail.com",
            age: 30

        }, {
            img: "https://plus.unsplash.com/premium_photo-1675129626614-7636908ebcf3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            uname: "ankit",
            email: "ankit@gmail.com",
            age: 30

        }
    ])

    const display = data.map(
        (d, i) => {
            return <Person path={d.img} age={d.age} name={d.uname} />
        }
    )


    return (
        <div className="container">
            {display}
        </div>
    )
}

export default App;