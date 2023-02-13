import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {activeEmail} from "../redux/activeEmailSlice";
import { markRead, markFav } from "../redux/emailsSlice";
import { covertTo12hrFormat, dateFormat } from "../utils/helper";
import "./Email.css";

const Email = ({ email_data:email,id }) => {
  const [date, setDate] = useState("");
  const [unread, setUnread] = useState(email.unread)
  const [fav, setFav] = useState(false)
  const currentEmail = useSelector((state) => state.activeEmail);
  // const email = (useSelector((state) => state.activeEmail))[id-1];
  const dispatch = useDispatch();

  useEffect(() => {
    let email_date = new Date(email.date);
    setDate(
      `${dateFormat(email_date)} ${covertTo12hrFormat(
        email_date.getHours(),
        email_date.getMinutes()
      )}  `
    );
  });

  const onEmailClick = async (id) => {
    setUnread(false)
    const res = await fetchEmail(email.id);
    console.log("clicked", email, activeEmail.id);
    dispatch(
      activeEmail({
        id: email.id,
        subject: email.subject,
        name: email.from?.name,
        date: date,
        body: res.data.body
      })
    );
    dispatch(markRead(id));
  };

  const fetchEmail = async(id) => {
   return axios.get(`${process.env.REACT_APP_API_URL}?id=${id}`)
      .then((res) => {
        console.log("fetchEmailCalled");
        return res
        // email_data.unread=false
        // console.log(email_data);
      })
      .catch((err) => {
        console.error("Something went wrong during email body fetch", err);
      });
  };

  return (
    <div
      className={`email ${email.id === currentEmail.id ? "email--active" : ""} ${
        unread ? "email--unread" : ""
      } `}
      onClick={() => {
        onEmailClick(email.id);
      }}
    >
      <div className="email__left">
        <span className="email__avatar">
          {email.from?.name.split("")[0].toUpperCase()}
        </span>
      </div>
      <div className="email__right">
        <p className="email__from">
          From:{" "}
          <strong>
            {email.from?.name} &#60;{email.from?.email}&#62;
          </strong>
        </p>
        <p className="email__subject">
          Subject: <strong>{email.subject}</strong>
        </p>
        <p className="email__description">{email.short_description}</p>
        <p className="email__dateTime">
          {date}{" "}
          {email.favorite && <span className="email--fav" >Favourite</span>}
        </p>
      </div>
    </div>
  );
};

export default Email;
