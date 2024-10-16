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
import CharacterPage from "./pages/Generators/CharacterPage/CharacterPage.jsx";
import MonsterPage from "./pages/Generators/MonsterPage/MonsterPage.jsx";
import ItemPage from "./pages/Generators/ItemPage/ItemPage.jsx";
import TavernPage from "./pages/Generators/TavernPage/TavernPage.jsx";
import PlotPage from "./pages/Generators/PlotPage/PlotPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TavernAdmin from "./pages/Admin/TavernAdmin/TavernAdmin.jsx";
import ItemAdmin from "./pages/Admin/ItemAdmin/ItemAdmin.jsx";
import PlotHookAdmin from "./pages/Admin/PlotHookAdmin/PlotHookAdmin.jsx";
import CharacterAdmin from "./pages/Admin/CharacterAdmin/CharacterAdmin.jsx";
import ClassAdmin from "./pages/Admin/ClassAdmin/ClassAdmin.jsx";
import TraitAdmin from "./pages/Admin/TraitAdmin/TraitAdmin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "npc-generator", element: <NPCPage /> },
      { path: "character-generator", element: <CharacterPage /> },
      { path: "monster-generator", element: <MonsterPage /> },
      { path: "item-generator", element: <ItemPage /> },
      { path: "killing-blow-generator", element: <CombatDescriptionPage /> },
      { path: "tavern-generator", element: <TavernPage /> },
      { path: "plot-generator", element: <PlotPage /> },
      {
        path: "admin",
        children: [
          { path: "npc", element: <NPCAdmin /> },
          { path: "monster", element: <MonsterAdmin /> },
          { path: "tavern", element: <TavernAdmin /> },
          { path: "item", element: <ItemAdmin /> },
          { path: "plot-hook", element: <PlotHookAdmin /> },
          { path: "character", element: <CharacterAdmin /> },
          { path: "class", element: <ClassAdmin /> },
          { path: "trait", element: <TraitAdmin /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>
);
