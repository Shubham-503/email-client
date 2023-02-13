import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Email from "./components/Email";
import EmailActive from "./components/EmailActive";
import { allEmails, fetchEmailsBypage } from "./utils/emailsSlice";

function App() {
  const emails = useSelector((state) => state.emails);
  const [filteredEmails, setFilteredEmails] = useState(emails);
  const [filter, setFilter] = useState("")
  const dispatch = useDispatch();
  const currentEmail = useSelector((state) => state.activeEmail);

  // TODO: Convert to modular code
  const condition = (value, email) => {
    if (value === "read") return email.unread == true;
  };

  const filterEmails = (cond) => {
    console.log(emails);
    setFilter(cond)

    if (cond === "read") {
      const newArray = emails.filter((email) => !email.unread);
      setFilteredEmails(newArray);
    } else if (cond === "unread") {
      const newArray = emails.filter((email) => email.unread);
      setFilteredEmails(newArray);
    } else if (cond === "favorite") {
      const newArray = emails.filter((email) => email.favorite);
      setFilteredEmails(newArray);
    }
    console.log(emails);
  };

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

  const displayEmails = async (page) => {
    const res = await fetchEmailsbyPage(page);
    console.log(res);
    dispatch(allEmails(res));
    setFilteredEmails(res);
  };

  useEffect(() => {
    displayEmails(1);
  }, []);

  return (
    <div className="app">
      <div className="filterBy">
        <span>Filter By: </span>
        <div className="filterBy__categories">
          <span className={`unread ${filter==="unread"?"active":""}`} onClick={() =>
            {filterEmails("unread")}}>
            Unread
          </span>
          <span className={`read ${filter==="read"?"active":""}`} onClick={() =>
            {filterEmails("read")}}>
            Read
          </span>
          <span className={`favorite ${filter==="favorite"?"active":""}`} onClick={() =>
            {filterEmails("favorite")}}>
            Favorite
          </span>
        </div>
      </div>
      <div className="email-content">
        <div
          className="emails"
          style={{
            width: Object.keys(currentEmail).length !== 0 ? "30%" : "100%",
          }}
        >
          {filteredEmails &&
            filteredEmails.map((email) => {
              return <Email email_data={email} id={email.id} key={email.id} />;
            })}
        </div>
        {Object.keys(currentEmail).length !== 0 && <EmailActive />}
      </div>
      <div className="pages">
        <span
          className="pg1"
          onClick={() => {
            displayEmails(1);
          }}
        >
          1
        </span>
        <span
          className="pg2"
          onClick={() => {
            displayEmails(2);
          }}
        >
          2
        </span>
      </div>
    </div>
  );
}

export default App;
