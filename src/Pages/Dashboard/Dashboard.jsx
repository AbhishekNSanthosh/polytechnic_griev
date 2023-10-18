import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Buttons from '../../Components/Buttons/Buttons';
import AddModal from '../../Components/AddModal/AddModal';
import ListModal from '../../Components/ListModal/ListModal';
import notfoundimg from '../../Assets/notfound1.svg'
import Tab from '@mui/material/Tab';
import { Tabs } from '@mui/material';
import { GridLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const Dashboard = ({ user, reload, Token, logCall }) => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState('');
    const [modalOpenBy, setModalOpenBy] = useState("");
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [admins, setAdmins] = useState([]);
    const [callLetter, setCallLetter] = useState(false);
    const [value, setValue] = React.useState('one');

    const url = 'https://poly-backend-64o7.onrender.com'
    const navigate = useNavigate();
    const userType = localStorage.getItem('usertype')
    const userObj = localStorage.getItem('user')
    const userData = JSON.parse(userObj);

    //Sets tabs value for teacher letters.
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Function to get all Students.
    const getAllStudents = () => {
        setModalLoading(true)
        try {
            axios.get(`${url}/all_students/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setModalLoading(false)
                setStudents(res?.data)
            }).catch((err) => {
                setModalLoading(false)
                if (err?.response?.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            setModalLoading(false)
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
        }
    }

    //Function to get all teachers.
    const getAllTeachers = () => {
        setModalLoading(true);
        try {
            axios.get(`${url}/all_teachers/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setModalLoading(false)
                setTeachers(res?.data)
            }).catch((err) => {
                setModalLoading(false)
                if (err?.response?.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
        }
    }

    //Function to get AllAdmins.
    const getAllAdmins = () => {
        setModalLoading(true)
        try {
            axios.get(`${url}/all_admins/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setModalLoading(false)
                setAdmins(res?.data)
            }).catch((err) => {
                setModalLoading(false)
                if (err?.response?.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            setModalLoading(false)
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
        }
    }

    //Function to get all letters -- Admin access required
    const getAllLetters = () => {
        setLoading(true)
        try {
            axios.get(`${url}/all_letters/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setLoading(false);
                setLetters(res.data)
            }).catch((err) => {
                if (err?.response?.status === 401) {
                    localStorage.clear()
                }
                setLoading(false);
            })
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
            setLoading(false)
        }
    }

    //Function to get letters of students individual -- Student role
    const getUserLetter = () => {
        setLoading(true)
        try {
            axios.get(`${url}/student_letters/${userData?.id}/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setLoading(false);
                setLetters(res?.data);
            }).catch((err) => {
                setLoading(false);
                if (err?.response?.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            })
        } catch (error) {
            setLoading(false);
            if (error?.response?.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    //Function to get permitted teacher letters --- Teacher role required
    const getTeacherLetters = () => {
        setLoading(true)
        if (value === "one") {
            try {
                axios.get(`${url}/teacher_permitted_letters/`, {
                    headers: {
                        'x-access-token': Token
                    }
                }).then((res) => {
                    setLoading(false);
                    setLetters(res?.data);
                }).catch((err) => {
                    setLoading(false);
                    if (err?.response?.status === 401) {
                        localStorage.clear()
                        navigate('/')
                    }
                })
            } catch (error) {
                setLoading(false);
                if (error?.response?.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            }
        } else {

        }
    }

    //Function to get all the letters send by a teacher -- teacher role required.
    const teacherLetter = () => {
        setLoading(true)
        try {
            axios.get(`${url}/teacher_letters/${userData?.id}/`, {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setLoading(false);
                setLetters(res?.data);
            }).catch((err) => {
                setLoading(false);
                if (err?.response?.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            })
        } catch (error) {
            setLoading(false);
            if (error?.response?.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    //Fetches all letters when the page loads & when a change happens -- Admin role required.
    useEffect(() => {
        if (userType === 'Admin') {
            getAllLetters();
        }
    }, [reload, logCall, callLetter])

    //Fetches all letters when the page loads & when a change happens -- Student role required.
    useEffect(() => {
        if (userType === 'Student') {
            if (userData?.id === undefined) {
                const getUserDetails = () => {

                    axios.get(`${url}/user_details/`, {
                        headers: {
                            'x-access-token': Token
                        }
                    }).then((res) => {
                        localStorage.setItem('user', JSON.stringify(res.data))
                        const getUserLetter = () => {
                            setLoading(true)
                            try {
                                if (!userData?.id) {
                                    axios.get(`${url}/student_letters/${res.data?.id}/`, {
                                        headers: {
                                            'x-access-token': Token
                                        }
                                    }).then((res) => {
                                        setLoading(false);
                                        setLetters(res?.data);
                                    }).catch((err) => {
                                        setLoading(false);
                                        if (err?.response?.status === 401) {
                                            localStorage.clear()
                                            navigate('/')
                                        }
                                    })
                                } else {
                                    axios.get(`${url}/student_letters/${userData?.id}/`, {
                                        headers: {
                                            'x-access-token': Token
                                        }
                                    }).then((res) => {
                                        setLoading(false);
                                        setLetters(res?.data);
                                    }).catch((err) => {
                                        setLoading(false);
                                        if (err?.response?.status === 401) {
                                            localStorage.clear()
                                            navigate('/')
                                        }
                                    })
                                }
                            } catch (error) {
                                setLoading(false);
                                if (error?.response?.status === 401) {
                                    localStorage.clear()
                                    navigate('/')
                                }
                            }
                        }
                        getUserLetter();
                    }).catch((err) => {
                        if (err?.response?.status === 401) {
                            toast.error('Token Expired', {
                                position: 'top-center',
                                style: {
                                    backgroundColor: 'black',
                                    color: '#fff'
                                }
                            })
                            localStorage.clear()
                            setTimeout(() => {
                                window.location.reload()
                            }, 900);
                        }
                    })
                }
                getUserDetails();
            } else {
                getUserLetter();
            }
        }
    }, [reload, logCall, callLetter])

    //Fetches all letters when the page loads & when a change happens -- Teacher role required.
    useEffect(() => {
        if (userType === 'Teacher') {
            teacherLetter()
        }
    }, [reload, logCall, callLetter])

    //Set modal status whether open or not.
    const getModalStatus = (data) => {
        setModalOpen(data)
    }

    //Set who has opened the modal.
    const getModalStatusOpenBy = (data) => {
        setModalOpenBy(data)
    }

    //Calls the Getletter function when a change happens.
    const getletterCall = (data) => {
        setCallLetter(data)
    }

    //If AcessToken is not present, navigates automatically to login page.
    useEffect(() => {
        if (!Token) {
            navigate('/');
        }
    }, [getAllLetters, getAllAdmins, getAllStudents, getAllTeachers])

    return (
        <div className='dashboard'>
            {
                userType === 'Admin' &&
                <div className="buttons-row">
                    <Buttons getAllAdmins={getAllAdmins} getAllTeachers={getAllTeachers} getAllStudents={getAllStudents} getModalStatus={getModalStatus} getModalStatusOpenBy={getModalStatusOpenBy} Token={Token} />
                </div>
            }
            {
                userType === "Teacher" &&
                <div className="buttons_row_teacher">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab onClick={() => {
                            teacherLetter();
                        }} value="one" label="My Grievanes" />
                        <Tab onClick={() => {
                            getTeacherLetters();
                        }} value="two" label="Permitted Grievance" />
                    </Tabs>
                </div>
            }

            {

                loading ?
                    <div className="loadingDiv">
                        <GridLoader size={18} color="red" />
                    </div>

                    :
                    <>
                        {
                            letters.length === 0 ?
                                <>
                                    <div className="not-found">
                                        <img src={notfoundimg} alt="" className="not-found-img" />
                                        <span className="not-found-tag">No messages yet!</span>
                                        {userType === 'Student' && <span className="not-found-tag info">To add a new grievence , click on button on your right.</span>}
                                    </div>
                                </>
                                :
                                <div className="table-row">
                                    <DataTable getletterCall={getletterCall} userType={userType} data={letters} loading={loading} Token={Token} />
                                </div>
                        }
                    </>

            }
            <AddModal userType={userType} modalOpen={modalOpen} getModalStatus={getModalStatus} modalOpenBy={modalOpenBy} Token={Token} students={students} />
            <ListModal userType={userType} loading={loading} modalOpen={modalOpen} getModalStatus={getModalStatus} modalOpenBy={modalOpenBy} Token={Token} teachers={teachers} students={students} admins={admins} />
        </div>
    )
}

export default Dashboard