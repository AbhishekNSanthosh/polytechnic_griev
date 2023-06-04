import React from 'react'
import './AddGriev.css'
import { TextField } from '@mui/material'

function AddGriev() {
    return (
        <div className='addgriev'>
            <div className="add-row">
                <span className="add-title">Grievence Form</span>
            </div>
            <div className="add-row">
                <div className="add-box">
                    <div className="add-box-row">
                        <div className="add-box-col">
                            <div className="add-box-item-row">
                                <TextField className='add-griev-input subject' label='Subject' type='text' />
                            </div>
                        </div>
                        <div className="add-box-col">
                            <div className="add-box-item-row">
                                <TextField className='add-griev-input date' label='Date' type='text' />
                            </div>
                        </div>
                    </div>
                    <div className="add-box-row">
                        <div className="add-box-item-row">
                            <TextField className='add-griev-input desc' multiline
                                rows={8}
                                maxRows={8} label='Description' type='text' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGriev