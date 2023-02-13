import { createSlice } from "@reduxjs/toolkit";

const activeEmailSlice = createSlice({
  name: "currentActiveEmail",
  initialState: {},
  reducers: {
    activeEmail: (state, action) => {
      state ={ ...action.payload}
      console.log(state);
      return state
    },
  },
});

export const { activeEmail } = activeEmailSlice.actions;
export default activeEmailSlice.reducer;
