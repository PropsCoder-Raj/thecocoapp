import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import SettingsContext from "src/context/SettingsContext";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import { Box, Drawer, Typography } from "@mui/material";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import styled from "@emotion/styled";
import toast from "react-hot-toast";

const styles = {
  rootLight: {
    background: "#FFF",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    minHeight: "calc(100vh - 70px)",
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    margin: "0 20px 0 280px",
    "@media(max-width:899px)": {
      margin: "0 20px !important",
    },
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "94px 0px 0px 0px",
    "@media(max-width:900px)": {
      paddingTop: "84px !important",
    },
    "@media(max-width:600px)": {
      paddingTop: "77px !important",
    },
  },
  BoxStyle: {
    padding: "34px",
    border: "2px solid rgba(216, 216, 216, 1)",
    borderRadius: "16px",
  },
  profileBox: {
    display: "flex",
    gap: "8px",
  },
  userBox: {
    width: "-webkit-fill-available",
    display: "grid",
    justifyContent: "start",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "15px",
    border: "1px solid rgba(224, 220, 220, 1)",
  },
  GapBox: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    justifyContent: "start",
  },
};

const ProfileImg = styled("img")(({ theme }) => ({
  width: "70px",
  height: "70px",
  margin: "0 12px",
}));

const CoinImg = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
}));

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const themeSetting = useContext(SettingsContext);
  const User = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState("Arbitrage");
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    if (location) {
      if (
        location.pathname === "/sniper-dashboard" ||
        location.pathname === "/bot-setting" ||
        location.pathname === "/sniper-transactions"
      ) {
        setSelectedTab("Sniper");
      }
    }
  }, [location]);

 

  



  return (
    <>
    <Box sx={styles.rootLight}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <Box sx={styles.wrapper}>
       
        {(location.pathname === "/update-profile" || location.pathname === "/child-profile") && (
          <NavBar
            tabView={selectedTab}
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            setSelectedTab={(item) => setSelectedTab(item)}
          />
        )}
        <Box
          sx={
            location.pathname === "/update-profile" || location.pathname === "/child-profile"
              ? styles.contentContainer
              : {
                display: "flex",
                flex: "1 1 auto",
                overflow: "hidden",
              }
          }
        >
          <Box sx={styles.content} id="main-scroll">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
      
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
