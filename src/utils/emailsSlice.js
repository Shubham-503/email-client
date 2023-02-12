import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const emailsSlice = createSlice({
  name: "emails",
  initialState: [1,2,3],
  reducers: {
    allEmails: (state,action) => {
      state.length=0;
      state.push(...action.payload)
      // state=[];
      // state.push(action.payload)
    },
    filterEmails: (state, action) => {
      if (action.payload === "read") {
        state = state.map((email) => {
          if (email.unread === false) return email;
          return null;
        });
      } else if (action.payload === "unread") {
        state = state.map((email) => {
          if (email.read === true) {
            console.log("inside if block");
            return email;
          }
        });
      } else if (action.payload === "favorite") {
        state = state.map((email) => {
          if (email.favorite === true) return email;
        });
      }
    },
  },
});

export const { allEmails } = emailsSlice.actions;
export default emailsSlice.reducer;
