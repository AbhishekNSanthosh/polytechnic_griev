import React, { useEffect, useState } from 'react'
import './AddGriev.css'
import { TextField } from '@mui/material'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddGriev({ user, getCall }) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const url = 'https://poly-backend-64o7.onrender.com';
    const navigate = useNavigate();
    const Token = localStorage.getItem('access_token');
    const userType = localStorage.getItem('usertype');

    useEffect(() => {
        if (!Token) {
            localStorage.clear()
            setTimeout(() => {
                navigate('/')
            }, 900)
        }
    }, []);

    //Fucntion to submit the letters -- roles : Student, Teacher
    const handleSubmit = () => {
        if (userType !== 'Admin') {
            setLoading(true);
            axios.post(`${url}/add_letter/`, { title, body }, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setLoading(false)
                toast.success('Submitted successfully.', {
                    position: 'bottom-center',
                    style: {
                        backgroundColor: 'black',
                        color: '#fff'
                    }
                })
                setTimeout(() => {
                    navigate('/dashboard')
                }, 300);
            }).catch((err) => {
                setLoading(false)
                if (err?.response?.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
                toast.error('Something went wrong!.', {
                    position: 'bottom-center',
                    style: {
                        backgroundColor: 'black',
                        color: '#fff'
                    }
                })
            })
        }
    }

    return (
        <div className='addgriev'>
            <div className="add-row">
                <span className="add-title">Grievence Form</span>
            </div>
            {/* <div className="add-row">
                <div className="add-box">
                    <div className="add-box-row">
                        <div className="add-box-item-row">
                            <TextField className='add-griev-input subject' label='Subject' type='text' onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                    </div>
                    <div className="add-box-row">
                        <div className="add-box-item-row">
                            <TextField className='add-griev-input desc' multiline
                                rows={4}
                                maxRows={4} label='Description' type='text' onChange={(e) => { setBody(e.target.value) }} />
                        </div>
                    </div>
                </div>
                <div className="add-box-row-submit">
                    <button className="submit" onClick={e => {
                        e.preventDefault();
                        if (body === "" || title === "") {
                            toast.error('Fields cannot be empty..', {
                                position: 'bottom-center',
                                style: {
                                    backgroundColor: 'black',
                                    color: '#fff'
                                }
                            })
                        } else {
                            handleSubmit();
                            getCall(true)
                        }
                    }}>Submit</button>
                </div>
            </div> */}
            <div className="addGrievBox">
                <input placeholder='Enter your subject...' type="text" className="inputBox" onChange={(e) => {
                    setTitle(e.target.value)
                }} value={title} />
                <textarea rows="10"
                    cols="40"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value)
                    }} className='desc'
                    placeholder='Enter your content here...'
                />
                <div className="btnRow">
                    <button className="submitBtn" onClick={e => {
                        e.preventDefault();
                        if (body === "" || title === "") {
                            toast.error('Please enter something..', {
                            })
                        } else {
                            handleSubmit();
                            getCall(true)
                        }
                    }}
                        disabled={loading}
                    >Submit</button>
                    <button className="cancelBtn" onClick={e => {
                        e.preventDefault();
                        navigate('/')
                    }}
                        disabled={loading}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddGriev;