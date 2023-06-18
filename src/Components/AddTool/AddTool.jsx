import { Add } from '@mui/icons-material'
import { Fab, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import './AddTool.css'
import { useNavigate } from 'react-router-dom'

function AddTool() {

    const navigate = useNavigate()

    return (
        <div className='add-griev'>
            <Tooltip title="Add Griev" sx={{ position: 'absolute', bottom: '50px', right: '70px' }}>
                        <Fab onClick={() => navigate('/dashboard/add-griev')} color='error'>
                        <span class="material-icons add-icon">add</span>
                        </Fab>
            </Tooltip>
        </div>
    )
}

export default AddTool