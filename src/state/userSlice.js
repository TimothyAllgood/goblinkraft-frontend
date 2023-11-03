import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
