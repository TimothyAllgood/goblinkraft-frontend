import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Nav from "./components/Nav/Nav";
import "./App.css";
import useViewport from "./hooks/useViewport";
import axios from "axios";

export default function App() {
  const { width } = useViewport();
  const breakpoint = 620;
  const [sidebarOpen, setSidebarOpen] = useState(width > breakpoint);
  const token = useSelector((state) => state.user.token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  return (
    <>
      <div className="container">
        <div id="detail">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className={`inner-page ${sidebarOpen ? "sidebar-open" : ""}`}>
            <Nav />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
