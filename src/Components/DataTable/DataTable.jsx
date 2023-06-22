import React from 'react'
import './DataTable.css'
import { useNavigate } from 'react-router-dom'
import { GridLoader, HashLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
const DataTable = ({ userType, data, loading, Token }) => {

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
            {loading ?
                <div className="mobile-loading">
                    <div className="loading-spinner">
                        <GridLoader size={30} color="red" className='loading' />
                    </div>
                </div>
                :
                <>
                    {data && data.map((item, index) => (

                        <div className="mobile-container" key={index}>
                            <div className="mobile-div">
                                <div className="mobile-row-left" onClick={() => navigate('/dashboard/view', { state: item?.id })}>
                                    {userType === 'admin' ?
                                        <div className="mobile-row-left-row">
                                            <span className='data'>{item?.body.slice(0, 25)}...</span>
                                        </div>
                                        :
                                        <div className="mobile-row-left-row">
                                            <span className='data'>{item?.body.slice(0, 95)}...</span>
                                        </div>
                                    }
                                    <div className="mobile-row-left-row">
                                        <span className='data-date'>{item?.created_on.slice(0, 10)}</span>
                                    </div>
                                </div>
                                {userType === 'admin' &&
                                    <div className="mobile-row-right">
                                        <div className="mobile-row-left-row">
                                            {item?.status === true ?
                                                <span class="material-icons icon">mark_chat_read</span>
                                                :
                                                <span class="material-icons green">mark_chat_unread</span>
                                            }
                                        </div>
                                        <div className="mobile-row-left-row">
                                            <span class="material-icons icon">delete_outline</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </>
            }
        </div>
    )
}

export default DataTable