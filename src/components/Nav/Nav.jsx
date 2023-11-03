import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { logout } from "../../state/userSlice";

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
          <>
            <span className="btn">{username}</span>
            <span className="btn" onClick={signout}>
              Logout
            </span>
          </>
        ) : (
          <>
            <Link to="/login">
              <span className="btn">Login</span>
            </Link>
            <Link to="/signup">
              <span className="btn">Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
