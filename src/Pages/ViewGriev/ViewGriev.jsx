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

function ViewGriev({ Token ,userType}) {

    const [letter, setLetter] = useState({});
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const receivedData = location.state;


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
        }).catch((err) => {
            setLoading(true);
            // if (err.response.status === 401) {
            //     localStorage.clear()
            //     Cookies.remove('access_token')
            //     navigate('/')
            // }
        })
    }

    useEffect(() => {
            if (receivedData != "" && receivedData != undefined) {
                getLetter();
            }else{
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

                            <div className="view-item">
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
                                                // value={age}
                                                // onChange={handleChange}
                                                fullWidth
                                                label="Status"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Approved">Approved</MenuItem>
                                                <MenuItem value="Rejected">Rejected</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="view-item">
                                <div className="view-item-left">
                                    <div className="view-item-left-title">
                                        <span className="item-title left">VIEW ACCESS:</span>
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
                                                fullWidth
                                                label="ACCESS"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="CSE">CSE</MenuItem>
                                                <MenuItem value="CE">CE</MenuItem>
                                                <MenuItem value="ME">ME</MenuItem>
                                                <MenuItem value="EEE">EEE</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="actions-container">
                                <div className="actions-left">
                                    <div className="actions">
                                        <span className="item-title left">ACTIONS TAKEN</span>
                                    </div>
                                    <div className="actions">
                                        <textarea className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                                    </div>
                                </div>
                                <div className="actions-right">
                                    <div className="actions">
                                        <span className="item-title left">COMMENTS</span>
                                    </div>
                                    <div className="actions">
                                        <textarea className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                                    </div>
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