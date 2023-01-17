import React from 'react'
import "./EmailActive.css"

const EmailActive = ({activeEmail, setEmails, emails,markFav}) => {

 

  return (
    <div className={`emailActive `}>
      <div className="emailActive-top">
      <div className="user__container">
        <span className="avatar">{activeEmail.name[0]?.toUpperCase()}</span>
        <div className="user__details">
          <h1 className='user__name'>{activeEmail.subject}</h1>
          <p className="user__date">26/02/2022 10:30am {activeEmail.date}</p>
        </div>
      </div>
        <button className='fav-btn' onClick={()=>{markFav(activeEmail.id)}}>Mark as favorite</button>
      </div>
      <div className="emailActive-bottom">
        <p className='email__body' dangerouslySetInnerHTML={{__html: activeEmail.body}}>
          
           </p>
      </div>
    </div>
  )
}

export default EmailActive