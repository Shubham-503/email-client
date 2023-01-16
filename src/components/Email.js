import React from 'react'
import "./Email.css"

const Email = ({email_data: email}) => {
  return (
    <div className='email email--read' onClick={()=>{
      console.log('clicked')
      console.log(process.env.REACT_APP_API_URL)
      console.log(process.env)
    }}>
      <div className="email__left">
        <span className="email__avatar">{email.from?.name.split("")[0].toUpperCase()}</span>
      </div>
      <div className="email__right">
        <p className="email__from">From: <strong>{email.from?.name}  {email.from?.email}</strong></p>
        <p className="email__subject">Subject: <strong>{email.subject}</strong></p>
        <p className="email__description">{email.short_description}</p>
        <p className="email__dateTime">26/02/22 10:30am <span className='email--fav'>Favourite</span></p>
      </div>
    </div>
  )
}

export default Email