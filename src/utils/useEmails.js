import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allEmails } from "../redux/emailsSlice";
import { fetchEmailsbyPage } from "./helper";

const useEmails = (page=1) => {
  const dispatch = useDispatch();
  let res;
  const displayEmails = async (page) => {
     res = await fetchEmailsbyPage(page);
    // console.log(res);
    dispatch(allEmails(res));
    return res;
  };

  useEffect(() => {
    displayEmails(page);
  }, []);
console.log(res);
  return res
};

export default useEmails