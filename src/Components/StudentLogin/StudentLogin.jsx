import React, { useEffect, useState } from 'react'
import './StudentLogin.css'
import { TextField } from '@mui/material'
import { motion } from "framer-motion"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const StudentLogin = ({ getLoginPerson, handleLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const callLogin = () => {
        handleLogin(email, password)
    }

    const navigate = useNavigate()

    const token = Cookies.get('access_token')
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
            <div className='student-login'>
                <div className="student-login-col">
                    <div className="nav-button-box">
                        <span class="material-symbols-outlined  nav-button" onClick={() => getLoginPerson('noOne')}>
                            keyboard_backspace
                        </span>
                    </div>
                    <div className="student-login-row">
                        <div className="student-login-head">
                            <div className="student-login-title">
                                <span className="student-login-title-name">CARMEL</span>
                            </div>
                            <div className="student-login-title">
                                <span className="student-login-title-name">POLYTECHNIC</span>
                            </div>
                        </div>
                    </div>
                    <div className="student-login-row">
                        <span className="student-name">STUDENT</span>
                    </div>
                    <div className="student-login-row">
                        <div className="student-login-input-col">
                            <div className="student-login-input-row">
                                <TextField className='student-login-input' label='Username' type='text' onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="student-login-input-row">
                                <TextField className='student-login-input' label='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="student-login-input-row">
                                <button className="student-login-button" onClick={callLogin}>LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default StudentLogin