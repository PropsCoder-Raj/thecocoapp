import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import SettingsContext from "src/context/SettingsContext";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import { Box } from "@mui/material";

const styles = {
  root: {
    background: "#FFF",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },
  rootLight: {
    background: "#FFF;",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },
  wrapper1: {
    // backgroundColor: "#000",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    paddingTop: 70,
    minHeight: "calc(100vh - 64px)",
    // [theme.breakpoints.up("lg")]: {
    //   paddingLeft: 290,
    // },
    "@media(max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    // backgroundColor: "#fff",
    minHeight: "calc(100vh - 70px)",
    // [theme.breakpoints.up("lg")]: {
    //   paddingLeft: 290,
    // },
   
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    margin:"0 20px 0 280px",
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
  contentKyc: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "55px 25px 25px 25px",
    // [theme.breakpoints.down('lg')]: {
    //   padding: "30px 28px 30px",
    // },
  },
};

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const themeSeeting = useContext(SettingsContext);
  const User = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState("Arbitrage");

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
    <Box sx={styles.rootLight}
    >
       <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
     
      <Box
        sx={  `${styles.wrapper}` 
        }
      > 
        {(location.pathname == "/update-profile" || location.pathname == "/child-profile") &&
       <NavBar
        tabView={selectedTab}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        setSelectedTab={(item) => setSelectedTab(item)}
      />} 
        <Box sx={styles.contentContainer}>
          <Box sx={ styles.content } id="main-scroll">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
