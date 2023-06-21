import React from 'react'
import './ListModalItem.css'
import { Skeleton } from '@mui/material'

export default function ListModalItem({ loading, student, index }) {
  console.log(loading)
  return (
    <div className='list-item'>
      {!loading ?
        <>
          <div className="item-col">
            <div className="item-row">
              <span className="index">{index + 1}.</span>
            </div>
            <div className="item-row">
              <span className="list-name">{student?.name}</span>
            </div>
          </div>
          <div className="item-col">
            <span className="list-name">{student?.dept_code}</span>
          </div>
        </>
        :
        <Skeleton animation="wave" height={10} width="400px" />
      }

    </div>
  )
}
