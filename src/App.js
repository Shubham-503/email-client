import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Email from "./components/Email";
import EmailActive from "./components/EmailActive";
import { allEmails, fetchEmailsBypage } from "./utils/emailsSlice";

function App() {
  // const [, setEmails] = useState([])
  const [activeEmail, setActiveEmail] = useState({});
  const emails = useSelector((state) => state.emails);
  const dispatch = useDispatch();
  const markFav = (id) => {
    // setEmails(emails.map((email)=>{
    //   if (email.id == id) {
    //     console.log("in if block");
    //     email.favorite= true
    //   console.log(email.favorite);}
    //   console.log(email,id);
    //   return email
    // }))
    // commented
    // setEmails(prev => (prev.map((email) => {
    //   if (email.id === id) {
    //     console.log("in if block");
    //     email.favorite = true
    //     console.log(email.favorite);
    //   }
    //   console.log(email, id);
    //   return email
    // })))
    // let temp = emails[id-1]
    // console.log(id,temp);
    // console.log(activeEmail);
    // setEmails(emails=>emails.splice(id-1,1,{...temp,favorite:true}))
    // console.log(emails)
  };

  // TODO: Convert to modular code
  const condition = (value, email) => {
    if (value === "read") return email.unread == true;
  };

  // const filterEmails = ( cond) => {
  //   console.log(emails)
  //   if (cond === "read") {
  //     setEmails(prev => {
  //       prev.map(email => {
  //         if (email.unread === false ) return email
  //       })
  //     })
  //   } else if (cond === "unread") {
  //     setEmails(prev => {
  //       prev.map(email => {
  //         if (email.read === true) {
  //           console.log("inside if block");
  //           return email}
  //       })
  //     })
  //   } else if (cond === "favorite") {
  //     setEmails(prev => {
  //       prev.map(email => {
  //         if (email.favorite === true) return email
  //       })
  //     })
  //   }
  //   console.log(emails)
  // }

  const fetchEmailsbyPage = async (page) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}?page=${page}`)
      .then((res) => {
        console.log("fetchEmail by page called");

        let allEmails = res.data.list.map((email) => {
          email.unread = true;
          email.favorite = false;
          return email;
        });
        return allEmails;
      })
      .catch((err) => {
        console.error("Something went wrong during email fetch", err);
      });
  };

  useEffect(() => {
    (async () => {
      const res = await fetchEmailsbyPage(1);
      console.log(res);
      dispatch(allEmails(res));
    })();
  }, []);

  return (
    <div className="app">
      <div className="filterBy">
        <span>Filter By: </span>
        <div className="filterBy__categories">
          <span className="unread" onClick={""}>
            Unread
          </span>
          <span className="read active">Read</span>
          <span className="favorite">Favorite</span>
        </div>
      </div>
      <div className="email-content">
        <div
          className="emails"
          style={{
            width: Object.keys(activeEmail).length !== 0 ? "30%" : "100%",
          }}
        >
          {emails &&
            emails.map((email) => {
              return (
                <Email
                  email_data={email}
                  key={email.id}
                  setActiveEmail={setActiveEmail}
                  activeEmail={activeEmail}
                  markFav={markFav}
                />
              );
            })}
         
        </div>
        {Object.keys(activeEmail).length !== 0 && (
          <EmailActive
            activeEmail={activeEmail}
            emails={emails}
            markFav={markFav}
          />
        )}
      </div>
    </div>
  );
}

export default App;
