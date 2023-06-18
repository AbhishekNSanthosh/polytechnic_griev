import React from 'react'
import './ListModalList.css'
import ListModalItem from '../ListModalItem/ListModalItem'

export default function ListModalList({ students, modalOpenBy, teachers,admins }) {
  return (
    <div>
      {modalOpenBy === 'list-teachers' &&
        <>
          {
            teachers && teachers.map((student, index) => (
              <ListModalItem key={student?.id} student={student} index={index} />
            ))}
        </>
      }
      {modalOpenBy === 'list-students' &&
        <>
          {
            students && students.map((student, index) => (
              <ListModalItem key={student?.id} student={student} index={index} />
            ))
          }
        </>
      }
      {modalOpenBy === 'list-admins' &&
        <>
          {
            admins && admins.map((student, index) => (
              <ListModalItem key={student?.id} student={student} index={index} />
            ))
          }
        </>
      }

    </div>
  )
}
