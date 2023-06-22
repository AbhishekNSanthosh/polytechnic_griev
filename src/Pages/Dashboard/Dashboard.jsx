import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Buttons from '../../Components/Buttons/Buttons';
import AddModal from '../../Components/AddModal/AddModal';
import ListModal from '../../Components/ListModal/ListModal';
import notfoundimg from '../../Assets/notfound1.svg'

const Dashboard = ({user, reload, Token }) => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState('');
    const [modalOpenBy, setModalOpenBy] = useState("");
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [admins, setAdmins] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        if (!Token) {
            navigate('/');
        }
    }, [])

    const userType = localStorage.getItem('usertype')
    const userObj = localStorage.getItem('user')
    const userData = JSON.parse(userObj);

    const getAllStudents = () => {
        setModalLoading(true)
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_students/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setModalLoading(false)
                setStudents(res?.data)
            }).catch((err) => {
                setModalLoading(false)
                if (err.response.status === 401) {
                    localStorage.clear()
                    Cookies.remove('access_token')
                }
            })
        } catch (error) {
            setModalLoading(false)
            if (error.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
            }
        }
    }

    const getAllTeachers = () => {
        setModalLoading(true);
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_teachers/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTimeout(() => {
                    setModalLoading(false)
                }, 900);
                setTeachers(res?.data)
            }).catch((err) => {
                setModalLoading(false)
                if (err.response.status === 401) {
                    localStorage.clear()
                    Cookies.remove('access_token')
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
            }
        }
    }

    const getAllAdmins = () => {
        setModalLoading(true)
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_admins/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setModalLoading(false)
                setAdmins(res?.data)
            }).catch((err) => {
                setModalLoading(false)
                if (err.response.status === 401) {
                    localStorage.clear()
                    Cookies.remove('access_token')
                }
            })
        } catch (error) {
            setModalLoading(false)
            if (error.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
            }
        }
    }


    const getAllLetters = () => {
        setLoading(true)
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_letters/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTimeout(() => {
                    setLoading(false);
                }, 900);
                setLetters(res.data)
            }).catch((err) => {
                setLoading(false);
                if (err.response.status === 401) {
                    localStorage.clear()
                    Cookies.remove('access_token')
                }
            })
        } catch (error) {
            setLoading(false)
            if (error.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
            }
        }
    }

    const getUserLetter = () => {
        setLoading(true)
        try {
            axios.get('https://flask-production-37b2.up.railway.app/student_letters/' + userData?.id + "/", {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                setLetters(res.data);
            }).catch((err) => {
                setLoading(false);
                if (err.response.status === 401) {
                    localStorage.clear()
                    Cookies.remove('access_token')
                    navigate('/')
                }
            })
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                localStorage.clear()
                Cookies.remove('access_token')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        if (!Token) {
            localStorage.clear()
            Cookies.remove('access_token');
            navigate('/')
        }
    }, [])


    useEffect(() => {
        if (Token) {
            if (userType === 'Admin') {
                getAllLetters();
            } else if (userType === 'Student') {
                getUserLetter();
            }
        } else {
            localStorage.clear()
            Cookies.remove('access_token');
            navigate('/')
        }
    }, [reload])

    const getModalStatus = (data) => {
        setModalOpen(data)
    }

    const getModalStatusOpenBy = (data) => {
        setModalOpenBy(data)
    }


    return (
        <div className='dashboard'>
            {userType === 'Admin' &&
                <div className="buttons-row">
                    <Buttons getAllAdmins={getAllAdmins} getAllTeachers={getAllTeachers} getAllStudents={getAllStudents} getModalStatus={getModalStatus} getModalStatusOpenBy={getModalStatusOpenBy} Token={Token} />
                </div>}
            {letters.length === 0 ?
                <>
                    <div className="not-found">
                        <img src={notfoundimg} alt="" className="not-found-img" />
                        <span className="not-found-tag">No messages yet!</span>
                        {userType === 'Student' && <span className="not-found-tag info">To add a new grievence , click on button on your right.</span>}
                    </div>
                </>
                :
                <div className="table-row">
                    <DataTable userType={userType} data={letters} loading={loading} Token={Token} />
                </div>
            }
            <AddModal userType={userType} modalOpen={modalOpen} getModalStatus={getModalStatus} modalOpenBy={modalOpenBy} Token={Token} students={students} />
            <ListModal userType={userType} loading={loading} modalOpen={modalOpen} getModalStatus={getModalStatus} modalOpenBy={modalOpenBy} Token={Token} teachers={teachers} students={students} admins={admins} />
        </div>
    )
}

export default Dashboard