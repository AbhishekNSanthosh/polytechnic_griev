import { Fab, Tooltip } from '@mui/material'
import React from 'react'
import './AddTool.css'
import { useLocation, useNavigate } from 'react-router-dom'

function AddTool() {
    const navigate = useNavigate()
    const hideNavbar = ["/dashboard/add-griev","/dashboard/view"];

    const location = useLocation()

    if (hideNavbar.includes(location.pathname)) {
        return null; // Return null to hide the navbar component
    }


    return (
        <div className='add-griev'>
            <Tooltip title="Add Griev" sx={{ position: 'absolute', bottom:{sm: '50px',xs:'20px'}, right: {sm:'70px',xs:'20px'} }}>
                <Fab onClick={() => navigate('/dashboard/add-griev')} color='error'>
                    <span class="material-icons add-icon">add</span>
                </Fab>
            </Tooltip>
        </div>
    )
}

export default AddTool