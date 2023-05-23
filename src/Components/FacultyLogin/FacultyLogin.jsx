import React from 'react'
import './FacultyLogin.css'
import { TextField } from '@mui/material'
import {motion } from 'framer-motion'

const FacultyLogin = ({getLoginPerson}) => {
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className='faculty-login'>
            <div className="faculty-login-col">
                <div className="nav-button-box">
                    <span class="material-symbols-outlined  nav-button" onClick={()=>getLoginPerson('noOne')}>
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
                            <TextField className='faculty-login-input' label='Username' type='text' />
                        </div>
                        <div className="faculty-login-input-row">
                            <TextField className='faculty-login-input' label='Password' type='password' />
                        </div>
                        <div className="faculty-login-input-row">
                            <button className="faculty-login-button">LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default FacultyLogin