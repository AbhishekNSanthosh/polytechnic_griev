import React, { useState } from 'react'
import './ViewGriev.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { GridLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Aos from 'aos';
import 'aos/dist/aos.css'

function ViewGriev({ Token, userType }) {

    const [letter, setLetter] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiLoading, setApiLoading] = useState("")
    const [updateStatus, setUpdateStatus] = useState("")
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [comments, setComments] = useState("");
    const [updateComments, setUpdatedComments] = useState("");
    const [actions, setActions] = useState("");
    const [updatedActions, setUpdatedActions] = useState("");
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [showTeachers, setShowTeachers] = useState(false);
    const [teachers, setTeachers] = useState([]);

    const location = useLocation();
    const receivedData = location.state;

    useEffect(() => {
        Aos.init({ duration: 800 });
    }, [])

    const url = 'https://poly-backend-64o7.onrender.com'

    const handleTeacherSelection = (teacherId, teacherEmail) => {
        const selectedTeacher = { id: teacherId, email: teacherEmail };

        if (selectedTeachers.some(teacher => teacher.id === teacherId)) {
            setSelectedTeachers(selectedTeachers.filter(teacher => teacher.id !== teacherId));
        } else {
            setSelectedTeachers([...selectedTeachers, selectedTeacher]);
        }
    };

    // Generate the array of {id, name} objects for view access permission
    const generateViewAccessPermissions = () => {
        return selectedTeachers.map(teacher => ({ id: teacher.id, email: teacher.email }));
    };

    //API CALLS
    const getLetter = () => {
        setLoading(true);
        axios.get(`${url}/get_letter/${receivedData}/`, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            setLoading(false)
            setLetter(res?.data)
            setUpdateStatus(res?.data?.issue_stat);
            setComments(res?.data?.comments);
            setUpdatedComments(res?.data?.comments);
            setUpdatedActions(res?.data?.actions);
            setActions(res?.data?.actions);
            let recievedIds = JSON.parse(res.data.view_access_ids);
            if (recievedIds === null) {
                setSelectedTeachers([])
            } else {
                setSelectedTeachers(recievedIds);
            }
        }).catch((err) => {
            setLoading(true);
            if (err?.response?.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    const getAllTeachers = () => {
        try {
            axios.get(`${url}/all_teachers/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTeachers(res.data);
            }).catch((err) => {
                if (err?.response?.status === 401) {
                    localStorage.clear();
                }
            })
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
        }
    }

    useEffect(() => {
        if (Token && userType === "Admin") {
            getAllTeachers();
        }
    }, [])

    useEffect(() => {
        if (receivedData !== "" && receivedData !== undefined && Token) {
            getLetter();
        } else {
            navigate('/dashboard')
        }
    }, [receivedData])

    const updateRead = () => {
        axios.put(`${url}/status_update/${receivedData}/`, {
            status: 1
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {

        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
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
        axios.put(`${url}/issue_status_update/${receivedData}/`, {
            status: updateStatus
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            if (res) {
                toast.success(`Status updated: ${updateStatus}`, {
                    style: {
                        backgroundColor: "black",
                        color: '#fff'
                    }
                })
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    const handleComment = () => {
        setApiLoading("comment")
        axios.put(`${url}/comment_update/${receivedData}/`, {
            comments
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            if (res) {
                toast.success('Commented successfully', {
                    style: {
                        backgroundColor: "black",
                        color: '#fff'
                    }
                })
            }
            setApiLoading("")
            setUpdatedComments(comments)
        }).catch((err) => {
            setApiLoading("")
            if (err.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    const handledDeleteCommet = () => {
        axios.put(`${url}/comment_update/${receivedData}/`, {
            comments: null
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            if (res) {
                toast.success('Comment deleted successfully', {
                    style: {
                        backgroundColor: "black",
                        color: '#fff'
                    }
                })
                setUpdatedComments(null);
                setComments("");
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    const handleAction = () => {
        setApiLoading("action")
        axios.put(`${url}/action_update/${receivedData}/`, {
            actions
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            if (res) {
                toast.success('Commented successfully', {
                    style: {
                        backgroundColor: "black",
                        color: '#fff'
                    }
                })
                setApiLoading("")
                setUpdatedActions(actions)
            }
        }).catch((err) => {
            setApiLoading("")
            if (err.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    const handleDeleteAction = () => {
        axios.put(`${url}/action_update/${receivedData}/`, {
            actions: null
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            if (res) {
                toast.success('Comment deleted successfully', {
                    style: {
                        backgroundColor: "black",
                        color: '#fff'
                    }
                })
                setUpdatedActions(null);
                setActions("");
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }
    const selectedTeachersString = JSON.stringify(selectedTeachers);

    const handleUpdateViewAccess = () => {
        axios.put(`${url}/update_view_access_letter/${receivedData}/`, {
            ids: selectedTeachersString
        }, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            if (res) {
                toast.success('View access updated.', {
                    style: {
                        backgroundColor: 'black',
                        color: '#fff'
                    }
                })
                setShowTeachers(false)
            }
        }).catch((err) => {
            if (err.response.data.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    return (
        <div className='view-griev'>
            <div className="view-container" data-aos="fade-up">
                <div className="view-top">
                    <div className="view-top-title-con">
                        <span className="title-name">REGISTERED GRIEVANCE</span>
                    </div>
                </div>
                <div className="view-bottom">
                    {loading ?
                        <div className="loader-view">
                            <GridLoader size={18} color="red" />
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
                                        <span className="item-title">{letter?.student?.name ? letter?.student?.name : letter?.teacher?.name}</span>
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
                                        {letter?.student?.name}</span>
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
                            {userType === "Admin" &&
                                <hr className='hr-view' />
                            }
                            {userType === 'Admin' &&
                                <div className="view-access-container">
                                    <div className="view-access-col">
                                        <div className="view-access-row left-row">
                                            <span className="item-title custom left">CUSTOMIZE VIEW ACCESS:</span>
                                        </div>
                                        <div className="view-access-row">
                                            <div className="button-div-view" onClick={() => {
                                                if (teachers.length !== 0) {
                                                    setShowTeachers(!showTeachers);
                                                } else {
                                                    toast.error('No teachers to show!', {
                                                        style: {
                                                            backgroundColor: 'black',
                                                            color: '#fff'
                                                        }
                                                    })
                                                }
                                            }}>
                                                {showTeachers ?
                                                    <>
                                                        <span className="show-more">HIDE ALL TEACHERS </span>
                                                        <span className="material-icons">expand_less</span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="show-more">SHOW ALL TEACHERS </span>
                                                        <span className='material-icons'>expand_more</span>
                                                    </>
                                                }
                                            </div>
                                            {showTeachers &&
                                                <motion.div
                                                    className='motion'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1 }}
                                                >
                                                    <div className="container-access">
                                                        {teachers.length !== 0 && teachers.map((teacher, index) => (
                                                            <div className="access-item" key={index}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedTeachers.some(selected => selected.id === teacher.id)}
                                                                    onChange={() => handleTeacherSelection(teacher.id, teacher.email)}
                                                                />
                                                                <span className='access-name'>{teacher?.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="actions view-actions">
                                                        <button className="action-submit" onClick={() => {
                                                            handleUpdateViewAccess();
                                                        }}>Update View Access</button>
                                                    </div>

                                                </motion.div>
                                            }
                                        </div>
                                    </div>
                                    <div className="view-access-col-right">
                                        {selectedTeachers.length !== 0 ?
                                            <>
                                                <div className="button-div-view-access">
                                                    <span className="permision left">VIEW ACCESS PERMISSIONS:</span>
                                                </div>
                                                <div className='view-access-permission'>
                                                    {selectedTeachers.length ?
                                                        <ul>
                                                            {generateViewAccessPermissions().map(permission => (
                                                                // <li key={permission.id}>
                                                                //     {/* ID: {permission.id}, */}
                                                                //     Email: {permission.email}
                                                                // </li>

                                                                <button key={permission?.id} className="view-access-item">
                                                                    <span className='access-name'>Email: {permission.email}</span>
                                                                </button>
                                                            ))}
                                                        </ul>
                                                        :
                                                        <button className="view-access-item">
                                                            <span className='access-name'>Email</span>
                                                        </button>
                                                    }
                                                </div>
                                            </>
                                            : <>
                                                <div className="button-div-view-access">
                                                    <span className="permision left">VIEW ACCESS PERMISSIONS:</span>
                                                </div>
                                                <div className='view-access-permission'>
                                                    <ul>
                                                        <button className="view-access-item">
                                                            <span className='access-name'>No teachers were selected!!</span>
                                                        </button>
                                                    </ul>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            }

                            <hr className='hr-view' />
                            {userType !== "Admin" &&
                                <div className="status-container">
                                    <div className="status-left">
                                        <span className="item-title left">STATUS: </span>
                                        <span className="issue-status">{letter?.issue_stat}</span>
                                    </div>
                                </div>
                            }

                            <div className="actions-container">
                                <div className="actions-left" data-aos="fade-right">
                                    <div className="actions">
                                        <span className="item-title left">ACTIONS TAKEN:</span>
                                    </div>
                                    <>
                                        {updatedActions === "" || updatedActions === null ?
                                            <div className="actions-no">
                                                <span className="action-taken">No Actions added yet!</span>
                                            </div>
                                            :
                                            <div className="show-comment">
                                                <span>{updatedActions}</span>
                                                {userType === "Admin" &&
                                                    <span className="material-icons icon c-delete" onClick={() => {
                                                        handleDeleteAction();
                                                    }}>delete_outline</span>
                                                }
                                            </div>
                                        }
                                    </>
                                </div>
                                <div className="actions-right" data-aos="fade-left">
                                    <div className="actions">
                                        <span className="item-title left">COMMENTS:</span>
                                    </div>
                                    <>
                                        {updateComments === "" || updateComments === null ?
                                            <div className="actions-no">
                                                <span className="action-taken">No Comments added yet!</span>
                                            </div>
                                            :
                                            <div className="show-comment">
                                                <span>{updateComments}</span>
                                                {userType === "Admin" &&
                                                    <span className="material-icons icon c-delete" onClick={() => {
                                                        handledDeleteCommet();
                                                    }}>delete_outline</span>
                                                }
                                            </div>

                                        }
                                        <div className="actions">

                                        </div>
                                    </>
                                </div>
                            </div>
                            {userType === "Admin" &&
                                <hr className='hr-view' />
                            }
                            <div className="actions-container">
                                {userType === 'Admin' &&
                                    <div className="actions-left" data-aos="fade-right">
                                        <div className="actions">
                                            <span className="item-title left"> {updatedActions === null ? "Add" : "Edit"} Action:</span>
                                        </div>
                                        <>
                                            <div className="actions">
                                                <textarea value={actions} onChange={(e) => {
                                                    setActions(e.target.value);
                                                }} disabled={userType !== 'Admin'} className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                                            </div>
                                            <div className="actions">
                                                <button onClick={() => {
                                                    if (actions === "" && actions === " ") {
                                                        toast.error("Invalid Action!", {
                                                            style: {
                                                                backgroundColor: 'black',
                                                                color: '#fff'
                                                            }
                                                        })
                                                    } else {
                                                        handleAction();
                                                    }
                                                }} className="action-submit"
                                                    style={{
                                                        backgroundColor: apiLoading === "action" ? '#fcfcfc' : 'red',
                                                        border: apiLoading === "action" ? '1px solid red' : 'none',
                                                        color: apiLoading === "action" && 'red',
                                                    }}
                                                    disabled={apiLoading === "action" ? true : false}
                                                >{apiLoading !== "action" ? <>{updatedActions === null ? "Add" : "Edit"} Actions</> : "Updating..."}</button>
                                            </div>
                                        </>
                                    </div>
                                }
                                {userType === 'Admin' &&
                                    <div className="actions-right" data-aos="fade-left">
                                        <div className="actions">
                                            <span className="item-title left">{updateComments === null ? "Add" : "Edit"} Comment:</span>
                                        </div>
                                        <>
                                            <div className="actions">
                                                <textarea value={comments} disabled={userType === 'Student'} onChange={(e) => {
                                                    setComments(e.target.value)
                                                }} className='textarea' name="actions" id="" cols="30" rows="6"></textarea>
                                            </div>
                                            <div className="actions">
                                                <button className="action-submit" onClick={() => {
                                                    if (comments !== "" && comments !== " ") {
                                                        handleComment();
                                                    } else {
                                                        toast.error("Invalid Comment!", {
                                                            style: {
                                                                backgroundColor: 'black',
                                                                color: '#fff'
                                                            }
                                                        })
                                                    }
                                                }}
                                                    style={{
                                                        backgroundColor: apiLoading === "comment" ? '#fcfcfc' : 'red',
                                                        border: apiLoading === "comment" ? '1px solid red' : 'none',
                                                        color: apiLoading === "comment" && 'red',
                                                    }}
                                                    disabled={apiLoading === "comment" ? true : false}
                                                >{apiLoading !== "comment" ? <>{updateComments === null ? "Add" : "Edit"} Comment</> : "Updating..."}</button>
                                            </div>
                                        </>
                                    </div>
                                }
                            </div>
                        </>
                    }

                </div>
            </div>
        </div >
    )
}

export default ViewGriev