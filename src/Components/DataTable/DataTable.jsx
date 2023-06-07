import React from 'react'
import './DataTable.css'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

const DataTable = ({ data, loading }) => {

    const navigate = useNavigate()

    return (
        <div className='table-container'>

            {loading ?
                <div className="loading">
                 <HashLoader color="#05ff00"  size={102}/>
                </div>
                :
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Read Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <>
                            {data.map((item, index) => (
                                <tr key={index} onClick={() => navigate('/dashboard/view')} style={{ cursor: 'pointer' }}>
                                    <td>{index + 1}</td>
                                    <td className='t-data-body'>{item?.body.slice(0, 15)}</td>
                                    <td>{item?.created_on.slice(0, 10)}</td>
                                    <td><button className="read-status">UNREAD</button></td>
                                    <td>
                                        <div className="table-action">
                                            <span className="material-symbols-outlined delete">
                                                delete
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    </tbody>
                </table>

            }
        </div>
    )
}

export default DataTable