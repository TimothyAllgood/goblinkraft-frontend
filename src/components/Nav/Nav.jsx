import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { logout } from "../../state/userSlice";
import { Avatar, Box, Button } from "@mui/material";

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
  return (
    <div className="account-container">
      <div className="login-btns">
        {username ? (
          <Box display="flex" gap="1rem">
            <Avatar alt={username}>{username.charAt(0).toUpperCase()}</Avatar>
            <Button variant="contained" onClick={signout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box display="flex" gap="1rem">
            <Button variant="contained" href="/login">
              Login
            </Button>
            <Button variant="contained" href="/signup">
              Sign Up
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Nav;
