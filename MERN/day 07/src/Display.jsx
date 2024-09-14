import React, { useState } from 'react';

export default function Display(props) {
   
    return (
        <div className="container mt-4">
            <div>

                <ul className="list-group list-group-flush">
                    {
                        props.data.map(
                            (d, i) => {
                                return (
                                    <ListItem d={d} key={i} index={i}/>
                                )
                            }
                        )
                    }

                </ul>
            </div>
        </div>
    );
}
function ListItem({d,index}) {
    const [toggle, settoggle] = useState(false);
    function toggleHandler() {
        settoggle(!toggle)
    }
    return (
        <li onClick={toggleHandler} className={
            `
            ${toggle == true ? 'bg-danger' : 'bg-primary'} list-group-item d-flex cusur- justify-content-between align-items-center
            `
        }
            key={index}>
            {d}
            <button onClick={() => {
                props.deleteItem(index)
            }}
                className="btn btn-danger btn-sm">X</button>
        </li>
    )
}

