import React, { useState } from 'react'
import './ViewGriev.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { GridLoader } from 'react-spinners';

function ViewGriev({ Token, userType }) {

    const [letter, setLetter] = useState({});
    const [loading, setLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState("")
    const [teachers, setTeachers] = useState([]);
    const [access, setAccess] = useState("");
    const [clicked, setClicked] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState([]);

    const handleButtonClick = (index) => {
        setDisabledButtons((prevDisabledButtons) => {
            const updatedDisabledButtons = [...prevDisabledButtons];
            updatedDisabledButtons[index] = true; // Disable the clicked button
            return updatedDisabledButtons;
        });
    };

    const location = useLocation();
    const receivedData = location.state;

    console.log(receivedData)

    console.log(letter?.issue_stat)
    const getLetter = () => {
        setLoading(true);
        console.log(Token)
        axios.get('https://flask-production-37b2.up.railway.app/get_letter/' + receivedData + '/', {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            console.log(res.data);
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            setLetter(res?.data)
            setUpdateStatus(res?.data?.issue_stat)
        }).catch((err) => {
            setLoading(true);
            if (err.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
                navigate('/')
            }
        })
    }

    const getAllTeachers = () => {
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_teachers/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTeachers(res.data);
            }).catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear();
                    Cookies.remove('access_token');
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
            }
        }
    }

    useEffect(() => {
        getAllTeachers();
    }, [])


    useEffect(() => {
        if (receivedData != "" && receivedData != undefined) {
            getLetter();
        } else {
            navigate('/dashboard')
        }
    }, [receivedData])

    const updateRead = () => {
        axios.put('https://flask-production-37b2.up.railway.app/status_update/' + receivedData + '/', {
            status: 1
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            console.log(res)
            setTeachers(res.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
                navigate('/')
            }
        })
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (Token && userType === 'Admin') {
            updateRead();
        }
    }, [])


    const timestamp = letter?.created_on;
    const convertedDate = new Date(timestamp).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    const handleUpdateStatus = () => {
        axios.put(`https://flask-production-37b2.up.railway.app/issue_status_update/${receivedData}/`, {
            status: updateStatus
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(teachers)
    return (
        <div className='view-griev'>
            <div className="view-container">
                <div className="view-top">
                    <div className="view-top-title-con">
                        <span className="title-name">REGISTERED GRIEVANCE</span>
                    </div>
                </div>
                <div className="view-bottom">
                    {loading ?
                        <div className="loader-view">
                            <GridLoader size={30} color="red" />
                        </div>
                        :
                        <>
                            <div className="view-item">
                                <div className="view-item-left">
                                    <div className="view-item-left-title">
                                        <span className="item-title left">From: </span>
                                    </div>
                                </div>
                                <div className="view-item-right name">
                                    <div className="view-item-left-title">
                                        <span className="item-title">{letter?.student?.name}</span>
                                    </div>
                                    <div className="view-item-left-title">
                                        <span className="item-title">{letter?.dept_code}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="view-item">
                                <div className="view-item-left">
                                    <div className="view-item-left-title">
                                        <span className="item-title left">Date:</span>
                                    </div>
                                </div>
                                <div className="view-item-right">
                                    <div className="view-item-left-title">
                                        <span className="item-title">{convertedDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="view-item">
                                <div className="view-item-left">
                                    <div className="view-item-left-title">
                                        <span className="item-title left">Subject:</span>
                                    </div>
                                </div>
                                <div className="view-item-right">
                                    <div className="view-item-left-title">
                                        <span className="item-title">{letter.title}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="view-item">
                                <div className="view-item-left-title">
                                    <span className="item-title-sub">Respected Sir, <br /><br />
                                        {letter?.body}
                                        <br /><br />
                                        With Regards,
                                        <br /><br />
                                        <i>{letter?.student?.name}</i></span>
                                </div>
                            </div>

                            {userType === 'Admin' &&
                                <div className="view-item status">
                                    <div className="view-item-left">
                                        <div className="view-item-left-title">
                                            <span className="item-title left">STATUS:</span>
                                        </div>
                                    </div>
                                    <div className="view-item-right">
                                        <div className="view-item-left-title">
                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="demo-simple-select-autowidth"
                                                    value={updateStatus}
                                                    onChange={(e) => { setUpdateStatus(e.target.value) }}
                                                    fullWidth
                                                    label="Status"
                                                >
                                                    <MenuItem value="Pending">Pending</MenuItem>
                                                    <MenuItem value="Approved">Approved</MenuItem>
                                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <button className="update-status" onClick={() => {
                                                handleUpdateStatus()
                                            }}>Update Status</button>
                                        </div>
                                    </div>
                                </div>
                            }

                            {userType === 'Admin' &&
                                <div className="view-item">
                                    <div className="view-item-left">
                                        <div className="view-item-left-title">
                                            <span className="item-title left">VIEW ACCESS:</span>
                                        </div>
                                    </div>
                                    <div className="view-item-right">
                                        <div className="view-item-left-title">
                                            <div className="container-access">
                                                {teachers && teachers.map((teacher, index) => (
                                                    <button disabled={disabledButtons[index]} className="access-item">
                                                        <span onClick={() => {
                                                            handleButtonClick(index)
                                                            setClicked(true)
                                                            setAccess(access + teacher?.id + ',')
                                                        }} className='access-name'>{teacher?.email}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            {/* <span className='access-name'>Customize the view access of this letter.</span> */}
                                            {access != "" &&
                                                <div className="acces-row">
                                                    <span className='access-name'>{access}</span>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            }
                            <hr className='hr-view' />
                            <div className="actions-container">
                                <div className="actions-left">
                                    <div className="actions">
                                        <span className="item-title left">ACTIONS TAKEN:</span>
                                    </div>
                                    {userType === 'Admin' ?
                                        <>
                                            <div className="actions">
                                                <textarea disabled={userType != 'Admin'} className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                                            </div>
                                            <div className="actions">
                                                <button className="action-submit">Add Action</button>
                                            </div>
                                        </>
                                        :
                                        <div className="actions">
                                            <span className="action-taken">No actions taken yet!</span>
                                        </div>
                                    }
                                </div>
                                <div className="actions-right">
                                    <div className="actions">
                                        <span className="item-title left">COMMENTS:</span>
                                    </div>
                                    {userType === 'Admin' ?
                                        <>
                                            <div className="actions">
                                                <textarea disabled={userType != 'Admin'} className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                                            </div>
                                            <div className="actions">
                                                <button className="action-submit">Add Action</button>
                                            </div>
                                        </>
                                        :
                                        <div className="actions">
                                            <span className="action-taken">No actions taken yet!</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div >
    )
}

export default ViewGriev