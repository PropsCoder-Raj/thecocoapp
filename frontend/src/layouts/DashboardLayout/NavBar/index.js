import React, { useEffect, useState, useContext } from "react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { MdExitToApp as ExitToAppIcon } from "react-icons/md";
import PropTypes from "prop-types";
import SettingsContext from "src/context/SettingsContext";
import { UserContext } from "src/context/User";
import {
  Box,
  Drawer,
  Hidden,
  List,
  Button,
  ListSubheader,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AiFillDashboard } from "react-icons/ai";
import { MdNavigateNext } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import NavItem from "./NavItem";
import { MdHistory } from "react-icons/md";
import { ListItem, ListItemText, Collapse } from "@mui/material";
import { IoMdArrowBack } from "react-icons/io";
import { useTheme } from "@emotion/react";

function renderNavItems({ items, pathname, depth = 0, state, setSelectedTab }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) =>
          reduceChildRoutes({
            acc,
            item,
            pathname,
            depth,
            state,
            setSelectedTab,
          }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth,
  state,
  setSelectedTab,
}) {
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
          state,
          setSelectedTab,
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
        tabview={item.tabview}
        key={key}
        title={item.title}
        setSelectedTab={(item) => setSelectedTab(item)}
      />
    );
  }
  return acc;
}
const styles = {
  main: {},
  mobileDrawer: {
    width: 256,
    // background: theme.palette.background.header,
  },
  mobileDrawer: {
    width: 256,
    // background: theme.palette.background.header,
  },
  desktopDrawer: {
    width: "270px",
    height: "100%",
    background: "#232B3B",
    boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.10)",
    zIndex: "120",
    padding: "0 20px",
    "& .lightlogoutButton": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      // position: "absolute",
      bottom: "19px",
      left: "17px",
      borderRadius: "5px",
      fontWeight: "400",
      fontSize: "13px",
      color: "#fff",
      backgroundColor: "#151515",
    },
    "& .darklogoutButton": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      // position: "absolute",
      bottom: "19px",
      left: "17px",
      borderRadius: "5px",
      fontWeight: "400",
      fontSize: "13px",
      color: "#151515",
      backgroundColor: "#fff",
      // [theme.breakpoints.down('lg')]: {
      //   position: "inherit",
      // },
    },
  },
  rootLight: {
    width: "270px",
    height: "100%",
    background: "#fff",
    boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.10)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "45px",
    paddingLeft: "17px",
    borderRadius: "12px",
    marginTop: "-30px",
    "&:hover": {
      color: "#fff",
    },
    "& svg": {
      color: "#232B3B",
      fontSize: "20px",
    },
  },
  btnBox: {
    position: "relative",
    left: "30%",
    bottom: "-250px",
  },

  sideMenuBox: {
    "& .MuiCollapse-wrapperInner": {
      marginLeft: "45px",
    },
  },
  mainsidebar: {},
  logoBox: {
    paddingTop: "28px",
    paddingBottom: "20px",
  },
  profileBox: {
    paddingBottom: "44.35px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    "& .name": {
      fontSize: "20.227px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "30.341px",
    },

    "& .emailId": {
      color: "#89879F",
      fontSize: "14.159px",
      fontStyle: "normal",
      fontHeight: "16.991px",
    },
    "& .profilePic": {
      width: "60px",
      height: "60px",
      borderRadius: "100%",
    },
  },
  darkListItem: {
    "& .MuiListItemText-root": {
      marginLeft: "18px",
    },
    "& p": {
      fontSize: "16px !important",
      fontWeight: "400",
    },
    "& svg": {
      color: "#fff !important",
      fontSize: "20px",
    },
    "& .MuiTypography-displayBlock": {
      fontSize: "16px !important",
      fontWeight: "600",
      color: "#fff ",
    },
  },
  lightListItem: {
    "& .MuiListItemText-root": {
      marginLeft: "18px",
    },
    "& p": {
      fontSize: "16px !important",
      fontWeight: "400",
    },
    "& svg": {
      color: "#232B3B !important",
      fontSize: "20px",
    },
    "& .MuiTypography-displayBlock": {
      fontSize: "16px !important",
      fontWeight: "600",

      color: "#151515 ",
    },
  },
  lightSelectedListItem: {
    borderRadius: "0px 20px 20px 0px",
    background: "#0B1426 !important",
    color: "#151515 ",
    "& .MuiTypography-displayBlock": {
      color: "#fff ",
    },
  },
  darkSelectedListItem: {
    borderRadius: "0px 20px 20px 0px",
    background: "#fff !important",
    "& .MuiTypography-displayBlock": {
      color: "#151515 ",
    },
  },
  lightDailogOpen: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      maxWidth: "fit-content",
      padding: "20px",
      borderRadius: "20px",
      background: "#FFF",
      boxShadow: "3px 4px 9px 0px rgba(0, 0, 0, 0.25)",
      // [theme.breakpoints.down('md')]: {
      //   padding: "30px",
      // },
      // [theme.breakpoints.down('sm')]: {
      //   padding: "5px",
      // },
    },
    "& .lightHeading": {
      color: "#0B1426",
      fontSize: "30px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      letterSpacing: "0.3px",
      marginBottom: "13px",
    },
    "& .lightSubHeading": {
      color: "rgba(11, 20, 38, 0.50)",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
    },
  },
  darkDailogOpen: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      maxWidth: "fit-content",
      padding: "60px",
      borderRadius: "20px",
      background: "#0B1426",
      boxShadow: "3px 4px 9px 0px rgba(0, 0, 0, 0.25)",
      // [theme.breakpoints.down('md')]: {
      //   padding: "30px",
      // },
      // [theme.breakpoints.down('sm')]: {
      //   padding: "5px",
      // },
    },
    "& .darkHeading": {
      color: "#fff",
      fontSize: "30px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      letterSpacing: "0.3px",
      marginBottom: "13px",
    },
    "& .darkSubHeading": {
      color: "rgb(144 147 154 / 50%)",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
    },
  },
};
const handleItemClick = (href) => {
  console.log("Item clicked:", href);
};
const iconsFunction = (icon, alt) => {
  return <img src={icon} alt={alt} />;
};

const sections1 = [
  {
    items: [
      {
        title: "Help",
        icon: iconsFunction(
          "images/help.svg",
          "dashboard"
        ),
        // href: "/map",
        tabview: "Arbitrage",
        clickable: true,
      },
      {
        title: "About",
        icon: iconsFunction("images/about.svg",
          "binaryTree"
        ),
        // href: "/binary-tree",
        tabview: "Arbitrage",
        clickable: true,
      },
      {
        title: "Log out",
        icon: iconsFunction("images/logout.svg",
          "wallet"
        ),
        // href: "/wallet",
        tabview: "Arbitrage",
        clickable: false,
      },
    ],
  },
];
const NavBar = ({ onMobileClose, openMobile, tabView, setSelectedTab }) => {
  const themeSeeting = useContext(SettingsContext);
  const sections = [
    {
      items: [
        {
          title: "Help",
          icon: iconsFunction(
            "images/help.svg",
            "dashboard"
          ),
          // href: "/map",
          tabview: "Arbitrage",
          clickable: true,
        },
        {
          title: "About",
          icon: iconsFunction("images/about.svg",
            "binaryTree"
          ),
          // href: "/binary-tree",
          tabview: "Arbitrage",
          clickable: true,
        },
        {
          title: "Log out",
          icon: iconsFunction("images/logout.svg",
            "wallet"
          ),
          // href: "/wallet",
          tabview: "Arbitrage",
          clickable: false,
        },


      ],
    },
  ];
  const location = useLocation();

  const [isOpen, setIsOpen] = useState([]);
  const handleItemClick = (path) => {
    navigate(path);
  };
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const renderedSections = tabView === "Arbitrage" ? sections : sections1;
  const User = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [profile, setProfile] = useState("");
  useEffect(() => {
    setProfile(User?.profile?.profilePic)
  }, [User.profile])
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleSublistToggle = (index) => {
    const newOpenState = [...isOpen];
    newOpenState[index] = !newOpenState[index];
    setIsOpen(newOpenState);
  };
  const content = (
    <>
      <Box height="100%" display="flex" flexDirection="column" sx={{ padding: "60px 20px", minWidth: "260px" }}>
        <Box sx={styles.logoBox}>

        </Box>
        <Box onClick={() => { navigate("/dashboard") }} sx={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(229, 229, 229, 1)", cursor: "pointer" }}>
          <IoMdArrowBack color={"rgba(182, 183, 184, 1)"} />
          <Typography >
            Back to home
          </Typography>
        </Box>
        <Box sx={{ marginTop: "20px", marginBottom:"20px"}}>
          <Typography >
            Profile
          </Typography>
          <Box sx={{ background: "rgba(230, 248, 254, 1)", padding: "15px", border:"1px solid rgba(51, 200, 245, 1)", borderRadius: "9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <img src={profile ? profile : "images/defaultPic.png"} alt="#" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
              <Typography variant="body1">
                {User?.profile?.name || "--"}
              </Typography>
            </Box>
            <FiEdit3 style={{ color: "rgba(182, 183, 184, 1)", fontSize: "25px" }} />

          </Box>

        </Box>
        <Box pt={2} pb={2} sx={styles.mainsidebar}>
          <Box sx="sideMenuBox">
            {renderedSections.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {section.items.map((item, j) => {
                  const hasItems = item.items && item.items.length > 0;
                  const isItemOpen = isOpen[j] || false;
                  return (
                    <Box sx={{ cursor: "pointer" }} key={`item${j}`}>
                      <ListItem

                        sx={{ display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center", padding: "10px 0 0 0", borderBottom: "1px solid rgba(229, 229, 229, 1)" }}
                        onClick={() => {
                          if (item.title === "Log out") {
                            setIsLogout(true)
                          }
                          if (hasItems) {
                            handleSublistToggle(j);
                          } else if (item.clickable) {
                            handleItemClick(item.href);
                          }
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          {item.icon}
                          <ListItemText primary={item.title} /></Box>
                        <MdNavigateNext color="rgba(182, 183, 184, 1)" />
                      </ListItem>
                      {hasItems && (
                        <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.items.map((subItem, k) => (
                              <Box sx={
                                { cursor: "pointer" }
                              } key={`subItem${k}`}>
                                <ListItem


                                  button
                                  // selected={location.pathname === subItem.href}
                                  onClick={
                                    subItem.clickable
                                      ? () => handleItemClick(subItem.href)
                                      : undefined
                                  }
                                  disabled={!subItem.clickable}
                                >
                                  {subItem.icon}
                                  <ListItemText primary={subItem.title} />
                                </ListItem>
                              </Box>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </Box>
                  );
                })}
              </List>
            ))}
          </Box>
        </Box>

        {isLogout && (
          <Dialog
            maxWidth="sm"
            fullWidth
            sx={styles.lightDailogOpen

            }
            open={isLogout}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setIsLogout(false)}
          >
            <DialogContent>
              <Box sx={styles.dialougTitle} align="center">
                <p
                  sx={
                    themeSeeting.settings.theme === "LIGHT"
                      ? "lightHeading"
                      : "darkHeading"
                  }
                >
                  Logout
                </p>
                <p
                  sx={
                    themeSeeting.settings.theme === "LIGHT"
                      ? "lightSubHeading"
                      : "darkSubHeading"
                  }
                >
                  Are you sure you want to log out?
                </p>
              </Box>
            </DialogContent>
            <DialogActions
              style={{
                display: "block",
              }}
            >
              <Box
                mt={2}
                style={{
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setIsLogout(false)}
                >
                  Cancel
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="contained"
                  onClick={() => {
                    window.localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );

  return <>
    {/* <Box sx={styles.main}></Box> */}

    {isMobile && (
      <Drawer
        anchor="left"
        sx={{
          paper: styles.desktopDrawer,
        }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        <Box p={2}>{content}</Box>
      </Drawer>
    )}
    {isDesktop && (<Drawer
      anchor="left"
      sx={{
        paper: styles.desktopDrawer,
      }}
      open
      variant="persistent"
    >
      {content}
    </Drawer>
    )}
  </>;
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
