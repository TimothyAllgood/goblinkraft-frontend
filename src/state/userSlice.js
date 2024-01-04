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
    role: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))?.role
      : null,
    id: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))?.id
      : null,
    colorScheme: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))?.colorScheme
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
      state.role = jwtDecode(action.payload).role;
      state.id = jwtDecode(action.payload).id;
      state.colorScheme = jwtDecode(action.payload).colorScheme;
      if (state.token) {
        axios.defaults.headers.common["Authorization"] = state.token;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }

      if (state.colorScheme) {
        console.log("here");
        document.documentElement.setAttribute("data-theme", colorScheme);
        console.log(document.documentElement.getAttribute("data-theme"));
      }
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
      state.id = null;
      state.colorScheme = null;
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
