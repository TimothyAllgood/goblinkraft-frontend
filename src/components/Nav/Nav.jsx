import React from "react";
import "./Nav.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { logout } from "../../state/userSlice";
import { Avatar, Box, Button } from "@mui/material";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { ReactSVG } from "react-svg";

function Nav() {
  const username = useSelector((state) => state.user.username);

  const { removeItem } = useLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = async () => {
    await dispatch(logout());
    await removeItem("token");
    navigate("/");
  };

  const items = [
    {
      path: "/generate/npc",
      label: "NPC Generator",
    },
    {
      path: "/generate/item",
      label: "Item Generator",
    },
    {
      path: "/generate/plot",
      label: "Plot Generator",
    },
    {
      path: "/generate/character",
      label: "Character Generator",
    },
  ];
  return (
    <div className="header">
      <Link className="logo" to="/">
        <ReactSVG className="logo-svg" src="/logo.svg" />
        <h1>Goblinkraft</h1>
      </Link>
      <div className="menu-container">
        <div className="menu">
          <NavLink className="dark-link animate-link" to="/dm-screen">
            DM Screen
          </NavLink>
          <NavLink className="dark-link animate-link" to="/campaigns">
            Campaigns
          </NavLink>
          <DropdownMenu title={"Generators"} items={items} />
          <NavLink className="dark-link animate-link" to="/dm-screen">
            Shop
          </NavLink>
        </div>
        <div className="login-btns">
          {username ? (
            <Box display="flex" gap="1rem">
              <Avatar alt={username}>{username.charAt(0).toUpperCase()}</Avatar>
              <Button variant="outlined" onClick={signout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap="1rem">
              <Button variant="outlined" href="/login">
                Login
              </Button>
              <Button variant="outlined" href="/signup">
                Sign Up
              </Button>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
