import React from 'react'
import './DataTable.css'

const DataTable = ({ data }) => {

    return (
        <div className='table-container'>

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
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.subject}</td>
                            <td>{item.date}</td>
                            <td><button className="read-status">{item.readStatus}</button></td>
                            <td>
                                <div className="table-action">
                                    <span className="material-symbols-outlined delete">
                                        delete
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default DataTable