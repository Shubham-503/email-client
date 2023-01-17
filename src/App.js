import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Email from './components/Email';
import EmailActive from './components/EmailActive';

function App() {
  const [emails, setEmails] = useState([])
  const [activeEmail, setActiveEmail] = useState({})

  const markFav = (id) => {
    // setEmails(emails.map((email)=>{
    //   if (email.id == id) {
    //     console.log("in if block");
    //     email.favorite= true
    //   console.log(email.favorite);}
    //   console.log(email,id);
    //   return email
    // }))
    setEmails( prev => (prev.map((email)=>{
      if (email.id == id) {
        console.log("in if block");
        email.favorite= true
      console.log(email.favorite);}
      console.log(email,id);
      return email
    })))


    // let temp = emails[id-1]
    // console.log(id,temp);
    // console.log(activeEmail);
    // setEmails(emails=>emails.splice(id-1,1,{...temp,favorite:true}))
    console.log(emails)

  }

 const fetchEmailsbyPage= async(page) => {
   axios.get(`${process.env.REACT_APP_API_URL}?page=${page}`)
    .then(res=>{
      console.log('fetchEmail by page called');

      setEmails(res.data.list.map((email)=>{
          email.unread= true;
          email.favorite = false;
          return email
      }))
    })
 }

 useEffect(() => {
  fetchEmailsbyPage(1)
 },[])
 

  return (
    <div className="app">
      <div className="emails" style={{width:(Object.keys(activeEmail).length!==0?"30%":"100%") }} >
        {
          emails.map((email)=>{
           return <Email email_data={email} key={email.id} setActiveEmail={setActiveEmail} activeEmail={activeEmail} markFav={markFav} />
          })
        }
        {/* <Email />
        <Email /> */}
      </div>
       { Object.keys(activeEmail).length!==0 &&  <EmailActive activeEmail={activeEmail} setEmails={setEmails} emails={emails} markFav={markFav} />}
    </div>
  );
}

export default App;
