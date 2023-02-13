import { createSlice } from "@reduxjs/toolkit";

const emailsSlice = createSlice({
  name: "emails",
  initialState: [],
  reducers: {
    allEmails: (state, action) => {
      state.length = 0;
      state.push(...action.payload);
      // state=[];
      // state.push(action.payload)
    },
    markRead: (state, action) => {
      state.map((email) => {
        if (email.id === action.payload) {
          email.unread = false;
        }
      });
    },
    markFav: (state, action) => {
      state.map((email) => {
        if (email.id === action.payload) {
          email.favorite = true;
        }
        return email;
      });
    },
  },
});

export const { allEmails, markRead, markFav } = emailsSlice.actions;
export default emailsSlice.reducer;
