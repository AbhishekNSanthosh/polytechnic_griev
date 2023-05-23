import React from 'react'
import './OptLogin.css'

function OptLogin({getLoginPerson}) {
    return (
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
                            <button className="opt-login-action-button faculty-button" onClick={()=>getLoginPerson('faculty')}>FACULTY LOGIN</button>
                        </div>
                        <div className="opt-login-actions">
                            <button className="opt-login-action-button student-button" onClick={()=>getLoginPerson('student')}>STUDENT LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OptLogin