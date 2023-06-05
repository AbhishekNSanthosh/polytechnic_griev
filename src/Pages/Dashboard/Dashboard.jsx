import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AddTool from '../../Components/AddTool/AddTool';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = ({ user, getCall }) => {

    const tableData = [
        {
            subject: 'Example Subject 1',
            date: '2023-05-20',
            readStatus: 'Unread'
        },
        {
            subject: 'Example Subject 2',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        {
            subject: 'Example Subject 3',
            date: '2023-05-21',
            readStatus: 'Read'
        },
        // Add more data objects as needed
    ];

    const [letters, setLetters] = useState([])

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
        axios.get('https://flask-production-37b2.up.railway.app/all_letters/', {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            setLetters(res.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
            }
        })
    }

    const getUserLetter = () => {
        axios.get('https://flask-production-37b2.up.railway.app/student_letters/' + userData?.id + "/", {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            setLetters(res.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
            }
        })
    }
    
    // useEffect(() => {
    //     if (!userObj) {
    //         localStorage.clear();
    //         Cookies.remove('access_token');
    //     }
    // }, [getUserLetter,getAllLetters])

    useEffect(() => {
        if (userType === 'Admin') {
            getAllLetters();
        } else if (userType === 'Student') {
            getUserLetter();
        }
    }, [getCall])

    return (
        <div className='dashboard'>
            <div className="table-row">
                <DataTable data={letters} />
            </div>
        </div>
    )
}

export default Dashboard