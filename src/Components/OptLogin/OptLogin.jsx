import React, { useEffect } from 'react'
import './OptLogin.css'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion';

function OptLogin({getLoginPerson}) {

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
        <div className='opt-login'>
            <div className="opt-login-col">
                <div className="poly-title-row">
                    <div className="poly-title">
                        <span className="poly-title-name">CARMEL</span>
                    </div>
                    <div className="poly-title">
                        <span className="poly-title-name">POLYTECHNIC</span>
                    </div>
                </div>
                <div className="poly-title-row">
                    <div className="opt-login-button-row">
                        <div className="opt-login-actions">
                            <button className="opt-login-action-button admin-button" onClick={()=>getLoginPerson('admin')}>ADMIN LOGIN</button>
                        </div>
                        <div className="opt-login-actions">
                            <button className="opt-login-action-button faculty-button" onClick={()=>getLoginPerson('teacher')}>FACULTY LOGIN</button>
                        </div>
                        <div className="opt-login-actions">
                            <button className="opt-login-action-button student-button" onClick={()=>getLoginPerson('student')}>STUDENT LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default OptLogin