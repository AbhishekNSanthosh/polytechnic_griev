import React, { useState } from 'react'
import './LoginDir.css'
import logo from '../../Assets/poly_logo.svg'
import OptLogin from '../../Components/OptLogin/OptLogin'
import AdminLogin from '../../Components/AdminLogin/AdminLogin';
import FacultyLogin from '../../Components/FacultyLogin/FacultyLogin';
import StudentLogin from '../../Components/StudentLogin/StudentLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

function LoginDir() {

  const [loginPerson, setLoginPerson] = useState("noOne");
  const [user, setUser] = useState(null)
  const navigate = useNavigate()


  const getLoginPerson = (data) => {
    setLoginPerson(data)
  }



  const handleLogin = async (email, password) => {
    try {

      axios.post('https://flask-production-37b2.up.railway.app/' + loginPerson + '_login/', {
        email, password
      }).then((res) => {
        setUser(res.data.role)
        localStorage.setItem('usertype', res.data.role)
        Cookies.set('access_token', res.data.token);
        toast.success('Logged in successfully.', {
          position: 'bottom-center',
          style: {
            backgroundColor: 'black',
            color: '#fff'
          }
        });
        setTimeout(() => {
          navigate('/dashboard')
        }, 900);
      }).catch((err) => {
        toast.error('Ivalid Credentials', {
          position: 'bottom-center',
          style: {
            backgroundColor: 'black',
            color: '#fff'
          }
        })
      })
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'bottom-center',
        style: {
          backgroundColor: 'black',
          color: '#fff'
        }
      })
    }
  }

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
            {loginPerson === 'admin' && <AdminLogin getLoginPerson={getLoginPerson} handleLogin={handleLogin} />}
            {loginPerson === 'teacher' && <FacultyLogin getLoginPerson={getLoginPerson} handleLogin={handleLogin} />}
            {loginPerson === 'student' && <StudentLogin getLoginPerson={getLoginPerson} handleLogin={handleLogin} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginDir