import React, { useState } from 'react'
import './LoginDir.css'
import logo from '../../Assets/poly_logo.svg'
import OptLogin from '../../Components/OptLogin/OptLogin'
import AdminLogin from '../../Components/AdminLogin/AdminLogin';
import FacultyLogin from '../../Components/FacultyLogin/FacultyLogin';
import StudentLogin from '../../Components/StudentLogin/StudentLogin';

function LoginDir() {

  const [loginPerson, setLoginPerson] = useState('noOne');

  const getLoginPerson = (data) => {
    setLoginPerson(data)
  }

  console.log(loginPerson)

  return (
    <div className='loginDir'>
      <div className="login-container">
        <div className="login-left">
          <div className="logo-box">
            <img src={logo} alt="" className="logo" />
          </div>
        </div>
        <div className="login-right">
          <div className="login-right-container">
            {loginPerson === 'noOne' && <OptLogin getLoginPerson={getLoginPerson} />}
            {loginPerson === 'admin' && <AdminLogin getLoginPerson={getLoginPerson}/>}
            {loginPerson === 'faculty' && <FacultyLogin getLoginPerson={getLoginPerson}/>}
            {loginPerson === 'student' && <StudentLogin getLoginPerson={getLoginPerson}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginDir