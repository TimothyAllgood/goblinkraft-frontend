import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./state/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index/Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { index: true, element: <Index /> },
      // {
      //   path: "login",
      //   element: <LoginSignupPage login={true} />,
      // },
      // {
      //   path: "signup",
      //   element: <LoginSignupPage login={false} />,
      // },
      // { path: "account/:id", element: <AccountPage /> },
      // {
      //   path: "verify/:id",
      //   element: <VerifyUser />,
      // },
      // {
      //   path: "test",
      //   element: <Test />,
      // },
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
