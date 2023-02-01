import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Email.css"

const Email = ({email_data, setActiveEmail, activeEmail,markFav}) => {
  const [date, setDate] = useState("")
  const [email, setEmail] = useState(email_data)

  useEffect(() => {
    let email_date = new Date(email.date)
    setDate(`${dateFormat(email_date)} ${covertTo12hrFormat(email_date.getHours(),email_date.getMinutes())}  `)
  })

  const dateFormat = (date) => {
    return `${String(date.getDate()).padStart(2,"0")}/${String(date.getMonth()).padStart(2,"0")}/${String(date.getFullYear()).padStart(2,"0")}`
  }

  const covertTo12hrFormat = (hh=20,mm=30) =>{
    const am_pm = hh>=12?"pm":"am"
    hh=hh%12
    if (hh===0) hh=12
    return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}${am_pm}`
  }

  
  const fetchEmail = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}?id=${id}`)
    .then(res=>{
      console.log('fetchEmailCalled');
      setActiveEmail(prev=>({
        id:email.id,
        subject: email.subject,
        name:email.from?.name,
        date:date,
        body:res.data.body
      }))
      setEmail(prev=>({...prev,unread:false}))
      email_data.unread=false
      console.log(email_data)
    })
    .catch(err => {
      console.error("Something went wrong during email body fetch", err)
    })
  }

  return (
    <div className={`email ${email.id===activeEmail.id?"email--active":""} ${email.unread?"email--unread":""} `}  
      onClick={()=>{
        fetchEmail(email.id)
        console.log('clicked', email, activeEmail.id)
      }}
     
    >
      <div className="email__left">
        <span className="email__avatar">{email.from?.name.split("")[0].toUpperCase()}</span>
      </div>
      <div className="email__right">
        <p className="email__from">From: <strong>{email.from?.name} &#60;{email.from?.email}&#62;</strong></p>
        <p className="email__subject">Subject: <strong>{email.subject}</strong></p>
        <p className="email__description">{email.short_description}</p>
        <p className="email__dateTime">{date} {email.favorite && <span className='email--fav'>Favourite</span>}</p>
      </div>
    </div>
  )
}

export default Email