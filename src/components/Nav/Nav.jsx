import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="account-container">
      <div className="login-btns">
        <Link to="/login">
          <span className="btn">Login</span>
        </Link>
        <Link to="/signup">
          <span className="btn">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
