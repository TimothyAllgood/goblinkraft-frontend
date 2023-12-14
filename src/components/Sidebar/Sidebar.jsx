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
import Nav from "../Nav/Nav";

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
          display: { xs: "flex", sm: "none" },
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
          display: { xs: "flex", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "min(70vw, 400px)",
          },
        }}
      >
        <Link to="/">
          <div className="logo">
            <ReactSVG className="logo-svg" src="/logo.svg" />
            <h1>Goblinkraft</h1>
          </div>
        </Link>
        <span className="divider"></span>
        <ul>
          <NavLink className="lone" to="/dm-screen">
            DM Screen
          </NavLink>
          <NavLink className="lone" to="/campaigns">
            Campaigns
          </NavLink>
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
