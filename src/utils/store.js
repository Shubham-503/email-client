import { configureStore } from "@reduxjs/toolkit";
import  emailsSlice  from "./emailsSlice";

const store = configureStore({
  reducer:{
    emails: emailsSlice,
  }
})

export default store ;