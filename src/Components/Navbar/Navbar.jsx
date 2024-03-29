import React from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../Assets/poly_logo.svg'
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const hideNavbar = ["/"];

    const location = useLocation()
    const navigate = useNavigate()

    if (hideNavbar.includes(location.pathname)) {
        return null; // Return null to hide the navbar component
    }

    const userObj = localStorage.getItem('user')
    const role = localStorage.getItem('usertype')
    const userData = JSON.parse(userObj);

    return (
        <>
            <div className='navbar'>
                <div className="nav">
                    <div className="navbar-container">
                        <div className="nav-left">
                            <div className="nav-left-container">
                                <img src={logo} alt="" className="nav-logo" onClick={() => navigate('/dashboard')} />
                            </div>
                        </div>
                        <div className="nav-right">
                            <div className="nav-right-item">
                                <div className="nav-account title">
                                    <span className="nav-account-name">Welcome, {userData?.name} <span className="role">({role})</span></span>
                                </div>
                                <div className="nav-account">
                                    <span className="material-symbols-outlined logout" onClick={() => {
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
                <hr className='hr-nav' />
            </div>
        </>
    )
}

export default Navbar