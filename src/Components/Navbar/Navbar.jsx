import React from 'react'
import './Navbar.css'
import { useLocation } from 'react-router-dom';
import logo from '../../Assets/poly_logo.svg'

const Navbar = () => {
    const hideNavbar = ["/"];

    const location = useLocation()

    if (hideNavbar.includes(location.pathname)) {
        return null; // Return null to hide the navbar component
    }
    return (
        <>
          <div className='navbar'>
          <div className="nav">
                <div className="navbar-container">
                    <div className="nav-left">
                        <div className="nav-left-container">
                            <img src={logo} alt="" className="nav-logo" />
                        </div>
                    </div>
                    <div className="nav-right">
                        <div className="nav-right-item">
                            <div className="nav-account">
                                <span className="nav-account-name">Welcome, ARNOLD</span>
                            </div>
                            <div className="nav-account">
                                <span class="material-symbols-outlined logout">
                                    logout
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
            <hr className='hr-nav' />
        </>
    )
}

export default Navbar