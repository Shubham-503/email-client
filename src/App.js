import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Email from "./components/Email";
import EmailActive from "./components/EmailActive";
import { allEmails } from "./redux/emailsSlice";
import { filterEmails, fetchEmailsbyPage } from "./utils/helper";

function App() {
  const emails = useSelector((state) => state.emails);
  const [filteredEmails, setFilteredEmails] = useState(emails);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const currentEmail = useSelector((state) => state.activeEmail);

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
          <span
            className={`unread ${filter === "unread" ? "active" : ""}`}
            onClick={() => {
              setFilter("unread");
              setFilteredEmails(filterEmails("unread", emails));
            }}
          >
            Unread
          </span>
          <span
            className={`read ${filter === "read" ? "active" : ""}`}
            onClick={() => {
              setFilter("read");
              setFilteredEmails(filterEmails("read", emails));
            }}
          >
            Read
          </span>
          <span
            className={`favorite ${filter === "favorite" ? "active" : ""}`}
            onClick={() => {
              setFilter("favorite");
              setFilteredEmails(filterEmails("favorite", emails));
            }}
          >
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
