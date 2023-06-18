import React from 'react'
import './DataTable.css'
import { useNavigate } from 'react-router-dom'
import { GridLoader, HashLoader } from 'react-spinners'

const DataTable = ({ data, loading, Token }) => {

    const navigate = useNavigate()
    return (
        <div className='table-container'>

            {loading ?
                <div className="loading">
                    <GridLoader size={30} color="red" />
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
                                <tr key={index} onClick={() => navigate('/dashboard/view', { state: item?.id })} style={{ cursor: 'pointer' }}>
                                    <td>{index + 1}</td>
                                    <td className='t-data-body'>{item?.body.slice(0, 15)}</td>
                                    <td>{item?.created_on.slice(0, 10)}</td>
                                    {item?.status === true ?
                                        <td><span class="material-icons done">mark_email_read</span></td>
                                        :
                                        <td><span class="material-icons undone">mark_email_unread</span></td>
                                    }
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