import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './AddModal.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};



export default function AddModal({ modalOpen, getModalStatus, modalOpenBy, Token }) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => getModalStatus("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [semester, setSemester] = React.useState("");
    const [department, setDepartment] = React.useState("");

    const navigate = useNavigate();

    const handleAdd = () => {
        const url = 'https://poly-backend-64o7.onrender.com'
        if (modalOpenBy === 'add-student') {
            try {
                axios.post(url + '/add_student/', {
                    name, email, password, sem: semester, dept: department
                }, {
                    headers: {
                        'x-access-token': Token
                    },
                }).then((res) => {
                    if (!res.data?.error) {
                        setDepartment('')
                        setEmail('')
                        setName('')
                        setSemester('')
                        setPassword('')
                        toast.success('New Student created.', {
                            position: 'bottom-center',
                            style: {
                                backgroundColor: 'black',
                                color: '#fff'
                            }
                        })
                        setTimeout(() => {
                            handleClose()
                        }, 300);
                    } else {
                        toast.error(res.data?.error, {
                            position: 'bottom-center',
                            style: {
                                backgroundColor: 'black',
                                color: '#fff'
                            }
                        })
                    }
                }).catch((err) => {
                    toast.error('Something went wrong!', {
                        position: 'bottom-center',
                        style: {
                            backgroundColor: 'red',
                            color: '#fff'
                        }
                    })
                    if (err.response.status === 401) {
                        localStorage.clear()
                        navigate('/')
                    }
                })
            } catch (error) {
                toast.error('Something went wrong!', {
                    position: 'bottom-center',
                    style: {
                        backgroundColor: 'red',
                        color: '#fff'
                    }
                })
                if (error.response.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            }
        }

        if (modalOpenBy === 'add-teacher') {
            try {
                axios.post(url + '/add_teacher/', {
                    name, email, password, dept: department
                }, {
                    headers: {
                        'x-access-token': Token
                    },
                }).then((res) => {
                    setDepartment('')
                    setEmail('')
                    setName('')
                    setSemester('')
                    setPassword('')
                    toast.success('New Teacher created.', {
                        position: 'bottom-center',
                        style: {
                            backgroundColor: 'green',
                            color: '#fff'
                        }
                    })
                    setTimeout(() => {
                        handleClose()
                    }, 300);
                }).catch((err) => {
                    toast.error('Something went wrong!', {
                        position: 'bottom-center',
                        style: {
                            backgroundColor: 'red',
                            color: '#fff'
                        },
                        iconTheme: '#fff'
                    })
                    if (err.response.status === 401) {
                        localStorage.clear()
                        navigate('/')
                    }
                })
            } catch (error) {
                toast.error('Something went wrong!', {
                    position: 'bottom-center',
                    style: {
                        backgroundColor: 'red',
                        color: '#fff'
                    }
                })
                if (error.response.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            }
        }

        if (modalOpenBy === 'add-admin') {
            try {
                axios.post(url + '/add_admin/', {
                    name, email, password,
                }, {
                    headers: {
                        'x-access-token': Token
                    },
                }).then((res) => {
                    setEmail('')
                    setName('')
                    setPassword('')
                    toast.success('New Admin created.', {
                        position: 'bottom-center',
                        style: {
                            backgroundColor: 'green',
                            color: '#fff'
                        }
                    })
                    setTimeout(() => {
                        handleClose()
                    }, 300);
                }).catch((err) => {
                    toast.error('Something went wrong!', {
                        position: 'bottom-center',
                        style: {
                            backgroundColor: 'red',
                            color: '#fff'
                        },
                        iconTheme: '#fff'
                    })
                })
            } catch (error) {
                toast.error('Something went wrong!', {
                    position: 'bottom-center',
                    style: {
                        backgroundColor: 'red',
                        color: '#fff'
                    }
                })
                if (error.response.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            }
        }

    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen === 'add'}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen === 'add'}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 600,
                        width: {
                            sm: '100%',
                            xs: '80%'
                        },
                        bgcolor: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: {
                            sm: 4,
                            xs: 1
                        },
                    }}>
                        <div className="modal-box">
                            <div className="modal-box-col">
                                <div className="modal-box-row">
                                    <div className="modal-box-row-item">
                                        {modalOpenBy === 'add-student' && <span className="modal-box-title">Add Student</span>}
                                        {modalOpenBy === 'add-teacher' && <span className="modal-box-title">Add Teacher</span>}
                                        {modalOpenBy === 'add-admin' && <span className="modal-box-title">Add Admin</span>}
                                    </div>
                                </div>
                                <div className={modalOpenBy === 'add-admin' ? "modal-box-row-admin" : "modal-box-row"}>
                                    <div className="modal-box-row-item">
                                        <TextField className='text-box' variant='outlined' label="Username" value={name} onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    <div className="modal-box-row-item">
                                        <TextField variant='outlined' label="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>
                                    {
                                        modalOpenBy === 'add-admin' &&
                                        <div className="modal-box-row-item">
                                            <TextField variant='outlined' label="Password" onChange={(e) => { setPassword(e.target.value) }} />
                                        </div>
                                    }
                                </div>
                                {modalOpenBy !== 'add-admin' &&

                                    <div className="modal-box-row">
                                        <div className="modal-box-row-item">
                                            <TextField variant='outlined' label="Password" onChange={(e) => { setPassword(e.target.value) }} />
                                        </div>
                                        {/* <div className="modal-box-row-item">
                                   <TextField variant='outlined' label="Confirm Password" />
                               </div> */}
                                        <div className="modal-box-row-item">
                                            <FormControl sx={{ minWidth: 236 }}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                                                <Select
                                                    variant='outlined'
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="demo-simple-select-autowidth"
                                                    value={department}
                                                    onChange={(e) => { setDepartment(e.target.value) }}
                                                    fullWidth
                                                    label="Department"
                                                >
                                                    <MenuItem value={"CSE"}>CSE</MenuItem>
                                                    <MenuItem value={"EEE"}>EEE</MenuItem>
                                                    <MenuItem value={"CE"}>CE</MenuItem>
                                                    <MenuItem value={"ME"}>ME</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                }
                                <div className="modal-box-row-left">
                                    {modalOpenBy === 'add-student' && <div className="modal-box-row-item">
                                        <FormControl sx={{ minWidth: 236 }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Semester</InputLabel>
                                            <Select
                                                variant='outlined'
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={semester}
                                                onChange={(e) => { setSemester(e.target.value) }}
                                                fullWidth
                                                label="Semester"
                                            >
                                                <MenuItem value={"1"}>1</MenuItem>
                                                <MenuItem value={"2"}>2</MenuItem>
                                                <MenuItem value={"3"}>3</MenuItem>
                                                <MenuItem value={"4"}>4</MenuItem>
                                                <MenuItem value={"5"}>5</MenuItem>
                                                <MenuItem value={"6"}>6</MenuItem>
                                                <MenuItem value={"7"}>7</MenuItem>
                                                <MenuItem value={"8"}>8</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>}

                                </div>
                                <div className="modal-box-row">
                                    <button className="add-submit" onClick={(e) => {
                                        e.preventDefault();
                                        if (name !== "" && email !== "" && password !== "") {
                                            handleAdd();
                                        }
                                    }}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}