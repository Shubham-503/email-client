import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Email from './components/Email';
import EmailActive from './components/EmailActive';

function App() {
  const [emails, setEmails] = useState([])

 const fetchEmailsbyPage= async(page) => {
   axios.get(`${process.env.REACT_APP_API_URL}?page=${page}`)
    .then(res=>{
      setEmails(res.data.list)
    })
 }

 useEffect(() => {
  fetchEmailsbyPage(1)
 
   
 }, [emails])
 

  return (
    <div className="app">
      <div className="emails">
        {
          emails.map((email)=>{
           return <Email email_data={email} key={email.id}/>
          })
        }
        {/* <Email />
        <Email /> */}
      </div>
      <EmailActive />
    </div>
  );
}

export default App;
