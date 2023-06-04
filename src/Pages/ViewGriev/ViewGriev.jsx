import React from 'react'
import './ViewGriev.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ViewGriev() {
    return (
        <div className='view-griev'>
            <div className="view-container">
                <div className="view-top">
                    <div className="view-top-title-con">
                        <span className="title-name">REGISTERED GRIEVANCE</span>
                    </div>
                </div>
                <div className="view-bottom">
                    <div className="view-item">
                        <div className="view-item-left">
                            <div className="view-item-left-title">
                                <span className="item-title">From: </span>
                            </div>
                        </div>
                        <div className="view-item-right">
                            <div className="view-item-left-title">
                                <span className="item-title">ARNOLD DENZIL</span>
                            </div>
                            <div className="view-item-left-title">
                                <span className="item-title">S8 CSE</span>
                            </div>
                        </div>
                    </div>

                    <div className="view-item">
                        <div className="view-item-left">
                            <div className="view-item-left-title">
                                <span className="item-title">Date:</span>
                            </div>
                        </div>
                        <div className="view-item-right">
                            <div className="view-item-left-title">
                                <span className="item-title">19 June 2023</span>
                            </div>
                        </div>
                    </div>

                    <div className="view-item">
                        <div className="view-item-left">
                            <div className="view-item-left-title">
                                <span className="item-title">Subject:</span>
                            </div>
                        </div>
                        <div className="view-item-right">
                            <div className="view-item-left-title">
                                <span className="item-title">Request for IV</span>
                            </div>
                        </div>
                    </div>

                    <div className="view-item">
                        <div className="view-item-left-title">
                            <span className="item-title-sub">Respected Sir, <br />
                                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual.
                                No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
                                With Regards,
                                Name</span>
                        </div>
                    </div>

                    <div className="view-item">
                        <div className="view-item-left">
                            <div className="view-item-left-title">
                                <span className="item-title">STATUS</span>
                            </div>
                        </div>
                        <div className="view-item-right">
                            <div className="view-item-left-title">
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        // value={age}
                                        // onChange={handleChange}
                                        autoWidth
                                        label="Status"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Twenty</MenuItem>
                                        <MenuItem value={21}>Twenty one</MenuItem>
                                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="view-item">
                        <div className="view-item-left">
                            <div className="view-item-left-title">
                                <span className="item-title">VIEW ACCESS</span>
                            </div>
                        </div>
                        <div className="view-item-right">
                            <div className="view-item-left-title">
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Access</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        // value={age}
                                        // onChange={handleChange}
                                        autoWidth
                                        label="ACCESS"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Twenty</MenuItem>
                                        <MenuItem value={21}>Twenty one</MenuItem>
                                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="actions-container">
                        <div className="actions-left">
                            <div className="actions">
                                <span className="item-title">ACTIONS TAKEN</span>
                            </div>
                            <div className="actions">
                                <textarea className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                            </div>
                        </div>
                        <div className="actions-right">
                            <div className="actions">
                                <span className="item-title">COMMENTS</span>
                            </div>
                            <div className="actions">
                                <textarea className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ViewGriev