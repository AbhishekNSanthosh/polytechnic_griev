import React, { useEffect } from 'react'
import './Buttons.css'
import Aos from 'aos';
import 'aos/dist/aos.css'

function Buttons({ getAllAdmins,getModalStatus, getModalStatusOpenBy, getAllTeachers, getAllStudents }) {
    useEffect(() => {
        Aos.init({ duration: 800 });
    }, [])
    return (
        <div className='buttons'>
             <div className="button-div" data-aos="fade-right">
                <button className="nav-btn" title='Add Admin' onClick={() => { getModalStatus('add'); getModalStatusOpenBy("add-admin") }}>Add Admin</button>
            </div>
            <div className="button-div" data-aos="fade-right">
                <button className="nav-btn" title='Add Student' onClick={() => { getModalStatus('add'); getModalStatusOpenBy("add-student") }}>Add Student</button>
            </div>
            <div className="button-div" data-aos="fade-right">
                <button className="nav-btn" title='Add Teacher' onClick={() => { getModalStatus('add'); getModalStatusOpenBy("add-teacher") }}>Add Teacher</button>
            </div>
            <div className="button-div" data-aos="fade-left">
                <button className="nav-btn" title='List Teachers' onClick={() => { getModalStatus('list'); getModalStatusOpenBy("list-teachers"); getAllTeachers(); }}>List Teachers</button>
            </div>
            <div className="button-div" data-aos="fade-left">
                <button className="nav-btn" title='List Students' onClick={() => { getModalStatus('list'); getModalStatusOpenBy("list-students"); getAllStudents(); }}>List Students</button>
            </div>
            <div className="button-div" data-aos="fade-left">
                <button className="nav-btn" title='List Admins' onClick={() => { getModalStatus('list'); getModalStatusOpenBy("list-admins"); getAllAdmins(); }}>List Admins</button>
            </div>
        </div>
    )
}

export default Buttons