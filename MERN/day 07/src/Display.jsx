import React from 'react';

export default function Display(props) {



    return (
        <div className="container mt-4">
            <div className="card">

                <ul className="list-group list-group-flush">
                    {
                        props.data.map(
                            (d, i) => {
                                return (
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        {d}
                                        <button className="btn btn-danger btn-sm">X</button>
                                    </li>
                                )
                            }
                        )
                    }

                </ul>
            </div>
        </div>
    );
}
