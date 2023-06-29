import React, { useEffect, useState } from 'react'
import './FacultyLogin.css'
import { TextField } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const FacultyLogin = ({ getLoginPerson, handleLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const callLogin = () => {
        handleLogin(email, password)
    }

    const navigate = useNavigate()

    const token = localStorage.getItem('access_token')
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className='faculty-login'>
                <div className="faculty-login-col">
                    <div className="nav-button-box">
                        <span className="material-symbols-outlined  nav-button" onClick={() => getLoginPerson('noOne')}>
                            keyboard_backspace
                        </span>
                    </div>
                    <div className="faculty-login-row">
                        <div className="faculty-login-head">
                            <div className="faculty-login-title">
                                <span className="faculty-login-title-name">CARMEL</span>
                            </div>
                            <div className="faculty-login-title">
                                <span className="faculty-login-title-name">POLYTECHNIC</span>
                            </div>
                        </div>
                    </div>
                    <div className="faculty-login-row">
                        <span className="faculty-name">FACULTY</span>
                    </div>
                    <div className="faculty-login-row">
                        <div className="faculty-login-input-col">
                            <div className="faculty-login-input-row">
                                <TextField className='faculty-login-input' label='Username' type='text' onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="faculty-login-input-row">
                                <TextField className='faculty-login-input' label='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="faculty-login-input-row">
                                <button onClick={e => {
                                    e.preventDefault();
                                    if (email != "" && password != "") {
                                        callLogin()
                                    }
                                }} className="faculty-login-button">LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default FacultyLogin