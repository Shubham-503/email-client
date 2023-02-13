import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { markFav } from '../utils/emailsSlice';
import "./EmailActive.css"

const EmailActive = () => {
  const currentEmail = useSelector((state) => state.activeEmail);
  const dispatch = useDispatch()
 

  return (
    <div className={`emailActive `}>
      <div className="emailActive-top">
      <div className="user__container">
        <span className="avatar">{currentEmail.name[0]?.toUpperCase()}</span>
        <div className="user__details">
          <h1 className='user__name'>{currentEmail.subject}</h1>
          <p className="user__date"> {currentEmail.date}</p>
        </div>
      </div>
        <button className='fav-btn' onClick={()=>{dispatch(markFav(currentEmail.id))}}>Mark as favorite</button>
      </div>
      <div className="emailActive-bottom">
        <p className='email__body' dangerouslySetInnerHTML={{__html: currentEmail.body}}>
          
           </p>
      </div>
    </div>
  )
}

export default EmailActive