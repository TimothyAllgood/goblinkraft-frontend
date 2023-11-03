import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./state/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index/Index.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import Admin from "./pages/Test/Admin.jsx";
import Open from "./pages/Test/Open.jsx";
import UserProtected from "./pages/Test/User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { index: true, element: <Index /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      { path: "reset-password/:id", element: <PasswordReset /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "verify/:id",
        element: <Verify />,
      },
      // Test Routes
      { path: "/user", element: <UserProtected /> },
      { path: "/admin", element: <Admin /> },
      { path: "/open", element: <Open /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
