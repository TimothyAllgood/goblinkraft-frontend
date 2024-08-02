import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import useViewport from "./hooks/useViewport";
import { useState } from "react";

function App() {
  const { width } = useViewport();
  const breakpoint = 1200;
  const [sidebarOpen, setSidebarOpen] = useState(width > breakpoint);

  return (
    <>
      <div className="stack-horizontal">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div id="detail" className={sidebarOpen ? "sidebar-open" : ""}>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
