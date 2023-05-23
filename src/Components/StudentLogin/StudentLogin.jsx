import React from 'react'
import './StudentLogin.css'
import { TextField } from '@mui/material'
import { motion } from "framer-motion"

const StudentLogin = ({ getLoginPerson }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
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
                                <TextField className='student-login-input' label='Username' type='text' />
                            </div>
                            <div className="student-login-input-row">
                                <TextField className='student-login-input' label='Password' type='password' />
                            </div>
                            <div className="student-login-input-row">
                                <button className="student-login-button">LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default StudentLogin