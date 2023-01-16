import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Email from './components/Email';
import EmailActive from './components/EmailActive';

function App() {
  const [emails, setEmails] = useState([])
  const [activeEmail, setActiveEmail] = useState({})
  const [activeEmailId, setActiveEmailId] = useState(-1)

 const fetchEmailsbyPage= async(page) => {
   axios.get(`${process.env.REACT_APP_API_URL}?page=${page}`)
    .then(res=>{
      setEmails(res.data.list.map((email)=>{
          email.unread= true;
          email.favorite = false;
          email.active = false
          return email
      }))
    })
 }

 useEffect(() => {
  fetchEmailsbyPage(1)
 }, [emails])
 

  return (
    <div className="app">
      <div className="emails" style={{width:(Object.keys(activeEmail).length!==0?"30%":"100%") }} >
        {
          emails.map((email)=>{
           return <Email email_data={email} key={email.id} setActiveEmail={setActiveEmail} activeEmail={activeEmail} setActiveEmailId={setActiveEmailId} activeEmailId={activeEmailId}/>
          })
        }
        {/* <Email />
        <Email /> */}
      </div>
       { Object.keys(activeEmail).length!==0 &&  <EmailActive activeEmail={activeEmail}  />}
    </div>
  );
}

export default App;
