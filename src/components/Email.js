import React from 'react'
import "./Email.css"

const Email = () => {
  return (
    <div className='email email--read' onClick={()=>{console.log('clicked')}}>
      <div className="email__left">
        <span className="email__avatar">A</span>
      </div>
      <div className="email__right">
        <p className="email__from">From: <strong>Foo Bar foo.bar@email.com</strong></p>
        <p className="email__subject">Subject: <strong>Lorem ipsum</strong></p>
        <p className="email__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, dolorum!</p>
        <p className="email__dateTime">26/02/22 10:30am <span className='email--fav'>Favourite</span></p>
      </div>
    </div>
  )
}

export default Email