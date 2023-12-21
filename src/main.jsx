import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./state/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index/Index.jsx";
import Signup from "./pages/User/Signup/Signup.jsx";
import Login from "./pages/User/Login/Login.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import PasswordReset from "./pages/User/PasswordReset/PasswordReset.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import Admin from "./pages/Test/Admin.jsx";
import Open from "./pages/Test/Open.jsx";
import UserProtected from "./pages/Test/User.jsx";
import DMScreen from "./pages/DMScreen/DMScreen.jsx";
import CategoryList from "./pages/Admin/Category/CategoryList/CategoryList.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CampaignList from "./pages/Campaigns/CampaignList/CampaignList.jsx";
import CampaignPage from "./pages/Campaigns/Campaign/CampaignPage/CampaignPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import CampaignNPC from "./pages/Campaigns/CampaignNPC/CampaignNPC.jsx";
import CampaignFaction from "./pages/Campaigns/Campaign/CampaignFaction/CampaignFaction.jsx";
import NPCList from "./pages/Generators/NPCList/NPCList.jsx";
import NPCGeneratorData from "./pages/Admin/NPCGeneratorData/NPCGeneratorData.jsx";
import ItemGeneratorData from "./pages/Admin/ItemGeneratorData/ItemGeneratorData.jsx";
import ItemList from "./pages/Generators/ItemList/ItemList.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(221, 66, 86)",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { index: true, element: <Index /> },
      // User
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      { path: "reset-password/:id", element: <PasswordReset /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "verify/:id",
        element: <Verify />,
      },
      { path: "/dm-screen", element: <DMScreen /> },
      // Campaign
      { path: "/campaigns", element: <CampaignList /> },
      {
        path: "/campaign/:id",
        element: <CampaignPage />,
        children: [
          { path: "npcs", element: <CampaignNPC /> },
          { path: "factions", element: <CampaignFaction /> },
        ],
      },

      // Generators
      {
        path: "/generate",
        children: [
          { path: "npc", element: <NPCList /> },
          { path: "item", element: <ItemList /> },
        ],
      },
      // Admin
      { path: "/admin/categories", element: <CategoryList /> },
      { path: "/admin/generators/npcs", element: <NPCGeneratorData /> },
      { path: "/admin/generators/items", element: <ItemGeneratorData /> },

      // Test Routes
      { path: "/user", element: <UserProtected /> },
      { path: "/admin", element: <Admin /> },
      { path: "/open", element: <Open /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
