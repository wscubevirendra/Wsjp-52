import React from 'react'

export default function Display({ movies }) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                {
                    movies.map(
                        (d, i) => {
                            return (
                                <div key={i} className='col-lg-4 col-6'>
                                    <div className='card'>
                                        <img style={{height:'350px'}} src={`https://image.tmdb.org/t/p/w1280${d.poster_path}`} alt="" />
                                        <div className='d-flex justify-content-between p-3'>
                                            <h6>{d.title}</h6>
                                            <h6>6.7/10</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}
