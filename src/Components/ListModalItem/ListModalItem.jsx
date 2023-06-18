import React from 'react'
import './ListModalItem.css'

export default function ListModalItem({ student, index }) {
  return (
    <div className='list-item'>
      <div className="-item-col">
        <div className="item-row">
          <span className="index">{index + 1}.</span>
        </div>
        <div className="item-row">
          <span className="name">{student?.name}</span>
        </div>
      </div>
      <div className="-item-col">
        <span className="name dep">{student?.dept_code}</span>
      </div>
    </div>
  )
}
