import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DataTable from '../../Components/DataTable/DataTable'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Buttons from '../../Components/Buttons/Buttons';
import AddModal from '../../Components/AddModal/AddModal';
import ListModal from '../../Components/ListModal/ListModal';

const Dashboard = ({ user, reload, Token }) => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState('');
    const [modalOpenBy, setModalOpenBy] = useState("");
    const [students,setStudents] = useState([])
    const [teachers,setTeachers] = useState([])
    const [admins,setAdmins] = useState([])

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
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_students/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                console.log(res?.data)
                setStudents(res?.data)
            }).catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
            }
        }
    }

    const getAllTeachers = () => {
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_teachers/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                console.log('teachers', res?.data)
                setTeachers(res?.data)
            }).catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
            }
        }
    }

    const getAllAdmins = () => {
        try {
            axios.get('https://flask-production-37b2.up.railway.app/all_admins/', {
                headers: {
                    'x-access-token': Token
                }
            }).then((res) => {
                console.log('teachers', res?.data)
                setAdmins(res?.data)
            }).catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
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
                }
            })
        } catch (error) {
            setLoading(false)
            if (error.response.status === 401) {
                localStorage.clear();
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
                }, 900);
                setLetters(res.data)
            }).catch((err) => {
                setLoading(false);
                if (err.response.status === 401) {
                    localStorage.clear()
                }
            })
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                localStorage.clear();
            }
        }
    }

    useEffect(() => {
        if (userType === 'Admin') {
            getAllLetters();
            // if (modalOpenBy === 'list-teachers') {
            //     getAllTeachers();
            // }
        } else if (userType === 'Student') {
            getUserLetter();
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
            <div className="buttons-row">
                <Buttons getAllAdmins={getAllAdmins} getAllTeachers={getAllTeachers} getAllStudents={getAllStudents} getModalStatus={getModalStatus} getModalStatusOpenBy={getModalStatusOpenBy} Token={Token} />
            </div>
            <div className="table-row">
                <DataTable data={letters} loading={loading} />
            </div>
            <AddModal modalOpen={modalOpen} getModalStatus={getModalStatus} modalOpenBy={modalOpenBy} Token={Token} students={students}/>
            <ListModal modalOpen={modalOpen} getModalStatus={getModalStatus} modalOpenBy={modalOpenBy} Token={Token} teachers={teachers} students={students} admins={admins}/>
        </div>
    )
}

export default Dashboard