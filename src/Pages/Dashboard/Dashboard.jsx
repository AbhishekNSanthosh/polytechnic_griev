import React, { useEffect } from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

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

    const Token = Cookies.get('access_token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!Token) {
            navigate('/')
        }
    }, [])


    return (
        <div className='dashboard'>
            <div className="table-row">
                <DataTable data={tableData} />
            </div>
        </div>
    )
}

export default Dashboard