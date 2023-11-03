import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))?.username
      : null,
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload;
      state.username = jwtDecode(action.payload).username;
      if (state.token) {
        axios.defaults.headers.common["Authorization"] = state.token;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
