import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user, reload }) => {
    const [letters, setLetters] = useState([])
    const [loading, setLoading] = useState(false)

    const Token = Cookies.get('access_token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!Token) {
            navigate('/')
        }
    }, [])

    const userType = localStorage.getItem('usertype')
    const userObj = localStorage.getItem('user')
    const userData = JSON.parse(userObj);



    const getAllLetters = () => {
        setLoading(true)
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_letters/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTimeout(() => {
                    setLoading(false);
                }, 900);
                setLetters(res.data)
            }).catch((err) => {
                setLoading(false);
                if (err.response.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            setLoading(false)
            if (error.response.status === 401) {
                localStorage.clear();
            }
        }
    }

    const getUserLetter = () => {
        setLoading(true)
        try {
            axios.get('https://flask-production-37b2.up.railway.app/student_letters/' + userData?.id + "/", {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTimeout(() => {
                    setLoading(false);
                }, 900);
                setLetters(res.data)
            }).catch((err) => {
                setLoading(false);
                if (err.response.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                localStorage.clear();
            }
        }
    }

    useEffect(() => {
        if (userType === 'Admin') {
            getAllLetters();
        } else if (userType === 'Student') {
            getUserLetter();
        }
    }, [reload])

    return (
        <div className='dashboard'>
            <div className="table-row">
                <DataTable data={letters} loading={loading} />
            </div>
        </div>
    )
}

export default Dashboard