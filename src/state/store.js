import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../state/counterSlice";

export default configureStore({
  reducer: { counter: counterReducer },
});
