import axios from "axios";

export const filterEmails = (cond, emails) => {
  if (cond === "read") {
    const newArray = emails.filter((email) => !email.unread);
    return newArray;
  } else if (cond === "unread") {
    const newArray = emails.filter((email) => email.unread);
    return newArray;
  } else if (cond === "favorite") {
    const newArray = emails.filter((email) => email.favorite);
    console.log(newArray);
    return newArray;
  }
  console.log(emails);
};

export const fetchEmailsbyPage = async (page) => {
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

export const dateFormat = (date) => {
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth()
  ).padStart(2, "0")}/${String(date.getFullYear()).padStart(2, "0")}`;
};

export const covertTo12hrFormat = (hh = 20, mm = 30) => {
  const am_pm = hh >= 12 ? "pm" : "am";
  hh = hh % 12;
  if (hh === 0) hh = 12;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(
    2,
    "0"
  )}${am_pm}`;
};
