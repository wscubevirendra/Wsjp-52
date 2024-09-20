import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const item = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Gallery',
            link: '/gallery'
        }
    ]
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">BrandName</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {
                            item.map(
                                (d, i) => {
                                    return (
                                        <li className="nav-item">
                                            <Link to={d.link} className="nav-link active" aria-current="page" >{d.name}</Link>
                                        </li>
                                    )
                                }
                            )
                        }


                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header
