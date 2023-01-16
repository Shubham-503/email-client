import axios from 'axios'
import { useRef } from 'react';
import React, { useEffect, useState } from 'react'
import "./Email.css"

const Email = ({email_data: email, setActiveEmail, activeEmail}) => {
  const [date, setDate] = useState("")
  const emailRef = useRef(null);

  useEffect(() => {
    let email_date = new Date(email.date)
    setDate(`${String(email_date.getDate()).padStart(2,"0")}/${String(email_date.getMonth()).padStart(2,"0")}/${String(email_date.getFullYear()).padStart(2,"0")} `)
  })
  
  const fetchEmail = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}?id=${id}`)
    .then(res=>{
      setActiveEmail({
        subject: email.subject,
        name:email.from?.name,
        date:date,
        body:res.data.body
      })
      console.log(emailRef)
      emailRef.current.className += "email--active"
    })
  }

  return (
    <div className={`email ${activeEmail && email.id === activeEmail.id ? "email--active": "" }`}  onClick={()=>{
      fetchEmail(email.id)
      console.log('clicked', email.id, activeEmail.id)
    }}
    ref= {emailRef}
    >
      <div className="email__left">
        <span className="email__avatar">{email.from?.name.split("")[0].toUpperCase()}</span>
      </div>
      <div className="email__right">
        <p className="email__from">From: <strong>{email.from?.name} &#60;{email.from?.email}&#62;</strong></p>
        <p className="email__subject">Subject: <strong>{email.subject}</strong></p>
        <p className="email__description">{email.short_description}</p>
        <p className="email__dateTime">26/02/22 10:30am {date} <span className='email--fav'>Favourite</span></p>
      </div>
    </div>
  )
}

export default Email