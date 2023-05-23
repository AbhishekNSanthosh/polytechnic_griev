import React from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'

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

    return (
        <div className='dashboard'>
            <div className="table-row">
            <DataTable data={tableData}/>
            </div>
        </div>
    )
}

export default Dashboard