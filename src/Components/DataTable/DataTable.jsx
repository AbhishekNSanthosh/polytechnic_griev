import React, { useState } from 'react'
import './DataTable.css'
import { useNavigate } from 'react-router-dom'
import { GridLoader, HashLoader } from 'react-spinners'
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios'
import { Box, Fade, Modal } from '@mui/material'
import DataTableItem from '../DataTableItem/DataTableItem';
import DataTableItemMobile from '../DataTableItem/DataTableItemMobile';

const DataTable = ({ userType, data, loading, Token, getletterCall }) => {
    const navigate = useNavigate();

    console.log(data.length)
    return (
        <div className='table-container'>
            {/* <span>{data.length}</span> */}
            <div className='table-wrap'>

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
                                {userType === 'Admin' && <>
                                    <th>Read Status</th>
                                    <th>Actions</th>
                                </>}
                            </tr>
                        </thead>

                        {data && data.map((item, index) => (
                            <DataTableItem getletterCall={getletterCall} loading={loading} Token={Token} index={index} key={index} item={item} userType={userType} />
                        ))}
                    </table>

                }
            </div>
            {loading ?
                <div className="mobile-loading">
                    <div className="loading-spinner">
                        <GridLoader size={30} color="red" className='loading' />
                    </div>
                </div>
                :
                <>
                    {data && data.map((item, index) => (

                        <DataTableItemMobile getletterCall={getletterCall} item={item} key={index} Token={Token} index={index} userType={userType} />

                    ))}
                </>
            }
        </div>
    )
}

export default DataTable