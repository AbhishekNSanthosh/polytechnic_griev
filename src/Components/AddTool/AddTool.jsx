import { Add } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import './AddTool.css'
import { useNavigate } from 'react-router-dom'

function AddTool() {

    const navigate = useNavigate()

    return (
        <div className='add-griev'>
            <Tooltip title="Add Griev" sx={{ position: 'absolute', bottom: '50px', right: '70px', backgroundColor: 'green' }}>
                <IconButton onClick={() => navigate('/dashboard/add-griev')}>
                    <Add sx={{ fontSize: '40px', color: "#FC0" }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default AddTool