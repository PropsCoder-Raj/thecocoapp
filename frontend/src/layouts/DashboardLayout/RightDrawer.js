/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import { matchPath } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, List, Avatar, Typography, } from "@mui/material";
import { Dialog } from "@mui/material";
import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from "src/component/ConfirmationDialog";
import { UserContext } from "src/context/User";
import {
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";

const sections = [
  {
    title: "Account setting",
    href: "/account-setting",
    icon: FaUserEdit,
  },

  {
    title: "Logout",
    href: "/map",
    icon: FaSignOutAlt,
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const styles = {
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: "100%",
    maxWidth: "558px",
    top: "30px",
    right: "0px",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    padding: "12px 15px 32px 15px",
    overflow: "unset",
    position: "absolute",
    background: "#2A2A2A",
    borderRadius: "10px",
    color: "#fff",
  },
  balanceDiv: {
    display: "flex",
    justifyContent: "space-between",
    padding: "34px",
    background: "#3E3E3E",
    borderRadius: "10px",
    alignItems: "center",
  },
  balanceSecondDiv: {
    display: "flex",
    gap: "15px",
  },
  menuListText: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "25px",
    textTransform: "capitalize",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  balanceText: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "38px",
    textTransform: "capitalize",
    color: "#FFFFFF",
  },
  logoutButton: {
    background: "linear-gradient(180.99deg, #2FF3FF -25%, #1E92AA 141.48%)",
    borderRadius: "5px",
    padding: "12px 0",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
  },
};

const NavBar = () => {
  useEffect(() => {
    user.getViewMyProfile();
    user.exchangeWallet();
  }, []);
  const [rightBar, setRightBar] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);
  const confirmationHandler = () => {
    navigate("/login");
    window.localStorage.removeItem("token");
    window.localStorage.clear();
  };
  const exchangeBalance = user?.exchangeBalance?.allExchangeTotal;
  const profilePic = user?.profile?.profilePic ? user?.profile?.profilePic : null;

  const content = (
    <>
      <Box style={{ display: "grid", gap: "20px" }}>
        <Box sx={styles.balanceDiv}>
          <Typography sx={styles.menuListText}>
            Total assets value(USDT):
          </Typography>
          <Box sx={styles.balanceSecondDiv}>
            {exchangeBalance && (
              <Typography sx={styles.balanceText}>
                {exchangeBalance}
              </Typography>
            )}
            {exchangeBalance && <img alt="" src="/images/Credit card.svg" />}
          </Box>
        </Box>
        <Box style={{ display: "grid", gap: "20px", padding: "0 34px" }}>
          <Box>
            {" "}
            <Typography
              onClick={() => navigate("/account-setting")}
              sx={styles.menuListText}
            >
              Account Settings
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography sx={styles.menuListText}>
              Security Center
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography sx={styles.menuListText}>
              API Binding
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography sx={styles.menuListText}>Feedback</Typography>
          </Box>
          <Box>
            {" "}
            <Typography sx={styles.menuListText}>
              Activate Account
            </Typography>
          </Box>
          <Box
            onClick={() => confirmationHandler()}
            sx={styles.logoutButton}
          >
            <Typography onClick={() => setOpen(true)} sx={styles.menuListText}>Logout</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );

  return (
    <>

      <img
        alt=""
        style={{ width: "35px", height: "35px", borderRadius: "100%" }}
        src={profilePic ? profilePic : "/images/profile.svg"}
        onClick={() => {
          setRightBar(!rightBar);
        }}
      />


      <Dialog
        styles={{ paper: styles.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Do you want to logout ?"}
          confirmationHandler={confirmationHandler}
        />
      )}
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
