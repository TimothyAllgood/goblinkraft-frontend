import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Nav from "./components/Nav/Nav";
import "./App.css";
import useViewport from "./hooks/useViewport";
import axios from "axios";
import { Stack } from "@mui/material";
import { useSSE, SSEProvider } from "react-hooks-sse";

export default function App() {
  const { width } = useViewport();
  const breakpoint = 620;
  const [sidebarOpen, setSidebarOpen] = useState(width > breakpoint);
  const token = useSelector((state) => state.user.token);
  const colorScheme = useSelector((state) => state.user.colorScheme);
  const [test, setTest] = useState();

  // useEffect(() => {
  //   // opening a connection to the server to begin receiving events from it
  //   const eventSource = new EventSource(
  //     "https://goblinkraft-backend-production.up.railway.app/update-user"
  //   );
  //   eventSource.onopen = () => {
  //     console.log("SSE connection opened");
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE error:", error);
  //   };

  //   // eventSource.onmessage = (event) => {
  //   //   try {
  //   //     const data = JSON.parse(event.data);
  //   //     console.log("Received SSE message:", data);
  //   //     setTest(data);
  //   //   } catch (error) {
  //   //     console.error("Error parsing SSE data:", error);
  //   //   }
  //   // };

  //   eventSource.addEventListener(
  //     "message",
  //     (event) => {
  //       console.log(event);
  //     },
  //     false
  //   );
  //   // return () => eventSource.close();
  // }, []);

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
