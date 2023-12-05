import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {
  faArrowLeft,
  faArrowRight,
  faDiceD20,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Box, Drawer } from "@mui/material";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const role = useSelector((state) => state.user.role);

  let items = [
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
  let campaign = [
    {
      path: "/worlds",
      label: "Worlds",
    },
    {
      path: "/campaigns",
      label: "Campaign",
    },
  ];
  let admin = [{ path: "/admin/categories", label: "Categories" }];

  return (
    <>
      <Box
        className={`toggle-menu ${sidebarOpen ? "move" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        sx={{
          width: "min(70vw, 400px)",
          display: { xs: "block", sm: "none" },
        }}
      >
        {sidebarOpen ? <></> : <FontAwesomeIcon icon={faDiceD20} />}
      </Box>
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "min(70vw, 400px)",
          },
        }}
      >
        <Link to="/">
          <div className="logo">
            <ReactSVG className="logo-svg" src="./src/assets/logo.svg" />
            <h1>Goblinkraft</h1>
          </div>
        </Link>
        <span className="divider"></span>
        <ul>
          <DropdownMenu title={"Campaign"} items={campaign} />
          <DropdownMenu title={"Generators"} items={items} />
        </ul>
        {role === "ADMIN" && (
          <ul>
            <DropdownMenu title={"Admin"} items={admin} />
          </ul>
        )}
      </Drawer>

      <Box
        className={`toggle-menu ${sidebarOpen ? "move" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        sx={{
          width: "min(70vw, 400px)",
          display: { xs: "none", sm: "block" },
        }}
      >
        {sidebarOpen ? (
          <FontAwesomeIcon icon={faArrowLeft} />
        ) : (
          <FontAwesomeIcon icon={faArrowRight} />
        )}
      </Box>
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: "min(70vw, 400px)",
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: "min(70vw, 400px)",
            boxSizing: "border-box",
          },
        }}
        className="header"
      >
        <Link to="/">
          <div className="logo">
            <ReactSVG className="logo-svg" src="./src/assets/logo.svg" />
            <h1>Goblinkraft</h1>
          </div>
        </Link>
        <span className="divider"></span>
        <ul>
          <DropdownMenu title={"Campaign"} items={campaign} />
          <DropdownMenu title={"Generators"} items={items} />
        </ul>
        {role === "ADMIN" && (
          <ul>
            <DropdownMenu title={"Admin"} items={admin} />
          </ul>
        )}
      </Drawer>
    </>
  );
}

export default Sidebar;
