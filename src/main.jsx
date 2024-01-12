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
import CampaignNPCEdit from "./pages/Campaigns/CampaignNPC/CampaignNPCEdit.jsx";

import CampaignFaction from "./pages/Campaigns/Campaign/CampaignFaction/CampaignFaction.jsx";
import NPCList from "./pages/Generators/NPCList/NPCList.jsx";
import NPCGeneratorData from "./pages/Admin/NPCGeneratorData/NPCGeneratorData.jsx";
import ItemGeneratorData from "./pages/Admin/ItemGeneratorData/ItemGeneratorData.jsx";
import ItemList from "./pages/Generators/ItemList/ItemList.jsx";
import PlotHookGeneratorData from "./pages/Admin/PlotHookGeneratorData/PlotHookGeneratorData.jsx";
import PlotHookList from "./pages/Generators/PlotHookList/PlotHookList.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import TavernPage from "./pages/Generators/TavernPage/TavernPage.jsx";
import TavernGeneratorData from "./pages/Admin/TavernGeneratorData/TavernGeneratorData.jsx";
import MonsterGeneratorData from "./pages/Admin/MonsterGeneratorData/MonsterGeneratorData.jsx";
import MonsterPage from "./pages/Generators/MonsterPage/MonsterPage.jsx";
import MonsterEdit from "./components/MonsterEdit/MonsterEdit.jsx";
import TrapList from "./pages/Generators/TrapList/TrapList.jsx";
import CombatDescriptionPage from "./pages/Generators/CombatDescriptionPage/CombatDescriptionPage.jsx";
import TownPage from "./pages/Generators/TownPage/TownPage.jsx";
import CharacterPage from "./pages/Generators/CharacterPage/CharacterPage.jsx";
import { jwtDecode } from "jwt-decode";

const scheme = localStorage.getItem("token")
  ? jwtDecode(localStorage.getItem("token"))?.colorScheme
  : null;

const theme = createTheme({
  components: {
    MuiInputBase: {
      root: {
        color: "var(--color)",
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popupIndicator: {
          color: "var(--main)",
        },
        inputRoot: {
          color: "var(--main)",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "var(--color)",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main)",
          },
        },
        notchedOutline: {
          borderColor: "var(--main)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "var(--color)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: "var(--main)",
          color: "var(--color)",
        },
        iconSeparator: {
          color: "var(--color)",
        },
        withBorderColor: {
          borderColor: "var(--color)",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "var(--color)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "var(--color)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: "var(--bg)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--main)",
        },
      },
    },
  },
  palette: {
    ...(scheme === "goblinmode"
      ? {
          primary: {
            main: "rgb(0, 255, 149)",
          },
        }
      : {
          primary: {
            main: "rgb(221, 66, 86)",
          },
        }),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
          {
            path: "npcs",
            element: <CampaignNPC />,
          },
          { path: "npcs/:npcId", element: <CampaignNPCEdit /> },
          { path: "factions", element: <CampaignFaction /> },
        ],
      },

      // Generators
      {
        path: "/generate",
        children: [
          { path: "character", element: <CharacterPage /> },
          { path: "item", element: <ItemList /> },
          { path: "monster", element: <MonsterPage /> },
          { path: "npc", element: <NPCList /> },
          { path: "plot-hook", element: <PlotHookList /> },
          { path: "tavern", element: <TavernPage /> },
          { path: "trap", element: <TrapList /> },
          { path: "combat-description", element: <CombatDescriptionPage /> },
          { path: "town", element: <TownPage /> },
        ],
      },
      // Admin
      {
        path: "/admin",
        children: [
          { path: "categories", element: <CategoryList /> },
          { path: "generators/npcs", element: <NPCGeneratorData /> },
          { path: "generators/items", element: <ItemGeneratorData /> },
          { path: "generators/plothooks", element: <PlotHookGeneratorData /> },
          { path: "generators/tavern", element: <TavernGeneratorData /> },
          {
            path: "generators/monsters",
            element: <MonsterGeneratorData />,
          },
        ],
      },

      {
        path: "/admin/generators/monsters/:id",
        element: <MonsterEdit />,
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
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
