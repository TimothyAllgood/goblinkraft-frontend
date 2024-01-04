import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Nav from "./components/Nav/Nav";
import "./App.css";
import useViewport from "./hooks/useViewport";
import axios from "axios";
import { Stack } from "@mui/material";

export default function App() {
  const { width } = useViewport();
  const breakpoint = 620;
  const [sidebarOpen, setSidebarOpen] = useState(width > breakpoint);
  const token = useSelector((state) => state.user.token);
  const colorScheme = useSelector((state) => state.user.colorScheme);

  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  if (colorScheme) {
    document.documentElement.setAttribute("data-theme", colorScheme);
  }

  return (
    <>
      <div className="container">
        <div id="detail">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <main className={sidebarOpen ? "open" : ""} open={sidebarOpen}> */}
          <main>
            <Stack>
              <Nav />
              <Outlet />
            </Stack>
          </main>
        </div>
      </div>
    </>
  );
}
