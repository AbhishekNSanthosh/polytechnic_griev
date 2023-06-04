import React from 'react'
import './Navbar.css'
import { useLocation } from 'react-router-dom';
import logo from '../../Assets/poly_logo.svg'
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

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
                                    <span className="material-symbols-outlined logout" onClick={() => {
                                        Cookies.remove('access_token');
                                        localStorage.clear();
                                        toast.success("Redirecting to login page.", {
                                            position: 'bottom-center',
                                            style: {
                                                backgroundColor: 'black',
                                                color: '#fff'
                                            }
                                        });
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 900);
                                    }}>
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