import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import useViewport from "./hooks/useViewport";
import { useState } from "react";
import Header from "./components/Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Profile from "./services/profile.service";
import { jwtDecode } from "jwt-decode";
import AdminNav from "./components/AdminNav/AdminNav";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const queryClient = useQueryClient();
  const { width } = useViewport();
  const breakpoint = 900;
  const [sidebarOpen, setSidebarOpen] = useState(width > breakpoint);
  const [username, setUsername, removeUsername] = useLocalStorage(
    "username",
    ""
  );
  const [role, setRole, removeRole] = useLocalStorage("role", "");

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const getUsername = async () => {
    const token = await getAccessTokenSilently();
    const decodedToken = jwtDecode(token);
    const profile = await Profile.getUsername(decodedToken.sub);
    return profile;
  };
  const { isFetching, isPending, isError, data, error } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(() => {
    getToken();
  }, [data]);

  const getToken = async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        // You can store the token in localStorage or state for later use
        if (!username || !role) {
          const decodedToken = jwtDecode(token);
          const profile = await Profile.getUsername(decodedToken.sub);
          setUsername(profile.username);
          setRole(profile.role);
        }
        localStorage.setItem("auth0Token", token);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    }
  };

  return (
    <>
      <div className="stack-horizontal">
        {width <= breakpoint && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div id="detail" className={sidebarOpen ? "sidebar-open" : ""}>
          {width > breakpoint && <Header />}
          <AdminNav />
          <main>
            <Outlet context={{ setSidebarOpen }} />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
