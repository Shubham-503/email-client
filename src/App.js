import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Email from "./components/Email";
import ShimmerEmailActive from "./components/ShimmerEmailActive";
import { allEmails } from "./redux/emailsSlice";
import { filterEmails, fetchEmailsbyPage } from "./utils/helper";
const EmailActive = React.lazy(() => import("./components/EmailActive"));

function App() {
  const emails = useSelector((state) => state.emails);
  let filteredEmails = emails;
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const currentEmail = useSelector((state) => state.activeEmail);

  const displayEmails = async (page) => {
    const res = await fetchEmailsbyPage(page);
    console.log(res);
    dispatch(allEmails(res));
    filteredEmails = res;
  };

  useEffect(() => {
    displayEmails(1);
  }, []);

  const onFilterClick = (cond) => {
    setFilter(cond);
    filteredEmails = filterEmails(cond, emails);
  };

  return (
    <div className="app">
      <div className="filterBy">
        <span>Filter By: </span>
        <div className="filterBy__categories">
          <span
            className={`unread ${filter === "unread" ? "active" : ""}`}
            onClick={() => onFilterClick("unread")}
          >
            Unread
          </span>
          <span
            className={`read ${filter === "read" ? "active" : ""}`}
            onClick={() => onFilterClick("read")}
          >
            Read
          </span>
          <span
            className={`favorite ${filter === "favorite" ? "active" : ""}`}
            onClick={() => onFilterClick("favorite")}
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
          {filteredEmails.length === 0 && <h1>No Email Found</h1>}
        </div>
        {Object.keys(currentEmail).length !== 0 && (
          <Suspense fallback={<ShimmerEmailActive />}>
            <EmailActive />
          </Suspense>
        )}
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
