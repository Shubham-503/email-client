import { configureStore } from "@reduxjs/toolkit";
import activeEmailSlice from "./activeEmailSlice";
import  emailsSlice  from "./emailsSlice";

const store = configureStore({
  reducer:{
    emails: emailsSlice,
    activeEmail: activeEmailSlice
  }
})

export default store ;