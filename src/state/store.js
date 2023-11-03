import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../state/counterSlice";
import userReducer from "../state/userSlice";

export default configureStore({
  reducer: { counter: counterReducer, user: userReducer },
});
