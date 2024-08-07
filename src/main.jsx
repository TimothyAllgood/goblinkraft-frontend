import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";
import "./index.css";
import NPCPage from "./pages/Generators/NPCPage/NPCPage.jsx";
import NPCAdmin from "./pages/Admin/NPCAdmin/NPCAdmin.jsx";
import MonsterAdmin from "./pages/Admin/MonsterAdmin/MonsterAdmin.jsx";
import CombatDescriptionPage from "./pages/Generators/CombatDescriptionPage/CombatDescriptionPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "generate",
        children: [
          { path: "npc", element: <NPCPage /> },
          { path: "character", element: <NPCPage /> },
          { path: "killing-blow", element: <CombatDescriptionPage /> },
        ],
      },
      {
        path: "admin",
        children: [
          { path: "npc", element: <NPCAdmin /> },
          { path: "monster", element: <MonsterAdmin /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://backend.goblinkraft.com/api",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
