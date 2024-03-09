import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./CampaignNav.css";
import { Box, Drawer, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function CampaignNav({ campaign }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [marginTop, setMarginTop] = useState("calc(50px + 4rem - 1px)");
  const [borderTop, setBorderTop] = useState("1px solid var(--bg)");
  const [headerHeight, setHeaderHeight] = useState(0);
  const navEl = useRef(null);
  const drawerWidth = "min(50vw, 300px)";

  const setRef = useCallback((node) => {
    if (navEl.current) {
    }

    if (node) {
      getMargin(node);
    }

    navEl.current = node;
  }, []);

  useEffect(() => {
    if (headerHeight > 0) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [headerHeight]);

  const onScroll = () => {
    if (navEl) {
      let scrollY = window.scrollY;

      if (headerHeight - scrollY >= 0) {
        setMarginTop(`${headerHeight - scrollY}px`);
      }

      if (headerHeight - scrollY < 0) {
        setMarginTop(`0px`);
      }

      if (scrollY > headerHeight) {
        setBorderTop("none");
      } else {
        setBorderTop("1px solid var(--bg)");
      }
    }
  };

  const getMargin = (el) => {
    let styles = window.getComputedStyle(el.children[0]);
    let mt = Number.parseInt(
      styles.getPropertyValue("margin-top").replace("px", "")
    );
    setHeaderHeight(mt);
    let scrollY = window.scrollY;

    if (mt - scrollY >= 0) {
      setMarginTop(`${mt - scrollY}px`);
    }

    if (mt - scrollY < 0) {
      setMarginTop(`0px`);
    }

    if (scrollY > mt) {
      setBorderTop("none");
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!campaign) return <p>No campaign found</p>;
  const drawer = (
    <div className="campaign-sidebar">
      <div className="campaign-head">
        <div
          className="campaign-header"
          style={{
            backgroundImage: campaign?.backgroundImage?.url
              ? `url(${campaign.backgroundImage.url})`
              : "black",
            height: drawerWidth,
          }}
        >
          <div className="campaign-name">{campaign.name}</div>
        </div>
      </div>
      <ul className="campaign-menu">
        <NavLink to={`/campaign/${campaign.id}/characters`}>Characters</NavLink>
        <NavLink to={`/campaign/${campaign.id}/deities`}>Deities</NavLink>
        <NavLink to={`/campaign/${campaign.id}/settlements`}>Dominions</NavLink>
        <NavLink to={`/campaign/${campaign.id}/settlements`}>
          Settlements
        </NavLink>
        <NavLink to={`/campaign/${campaign.id}/factions`}>Buildings</NavLink>
        <NavLink to={`/campaign/${campaign.id}/factions`}>Dungeons</NavLink>
        <NavLink to={`/campaign/${campaign.id}/factions`}>
          Points of Interest
        </NavLink>
        <NavLink to={`/campaign/${campaign.id}/factions`}>Factions</NavLink>
        <NavLink to={`/campaign/${campaign.id}/factions`}>
          Session Notes
        </NavLink>
      </ul>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        className={`toggle-campaign-menu ${!mobileOpen ? "" : "move-right"}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
      >
        {mobileOpen ? (
          <FontAwesomeIcon icon={faArrowLeft} />
        ) : (
          <FontAwesomeIcon icon={faArrowRight} />
        )}
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          ref={setRef}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: marginTop,
              borderTop: borderTop,
              borderRightColor: "var(--bg)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default CampaignNav;
