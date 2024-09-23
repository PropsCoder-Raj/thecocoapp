import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Button, Collapse, Container, Dialog, DialogActions, DialogContent, Drawer, Grid, keyframes, List, ListItem, ListItemText, ListSubheader, Slide, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "src/context/User";
import { IoMdArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { HiSwitchHorizontal } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { redirectToMail } from "src/utils";
import { LiaUserCircleSolid } from "react-icons/lia";
import { Link, animateScroll as scroll, scroller } from 'react-scroll';
import CircularProgress from '@mui/material/CircularProgress';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { isMobile } from "react-device-detect";


const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px); /* Adjust this value to control the bounce height */
    }
  `;
const style = {
  HandleMargin: {
    marginTop: "20px",
    marginBottom: "80px",
    minWidth: "260px",
    "@media(max-width:1000px)": {
      marginBottom: "60px",
    },
    "@media(max-width:767px)": {
      marginTop: "15px",
      marginBottom: "30px",
    },
  },
  mainscrollHide: {
    height: "calc(100vh - 64px )",
    overflow: "auto",
    '-ms-overflow-style': 'none',  // Internet Explorer 10+
    'scrollbar-width': 'none',  // Firefox
    '&::-webkit-scrollbar': {
      display: 'none !important'  // Safari and Chrome
    },
    /* Scrollbar track */
    "&::-webkit-scrollbar-track": {
      display: 'none !important'
    },

    /* Scrollbar thumb */
    "&::-webkit-scrollbar-thumb": {
      display: 'none !important'
    },

    /* Scrollbar thumb on hover */
    "&::-webkit -scrollbar-thumb:hover": {
      display: 'none !important'
    }
  },
  BoxStyle: {
    padding: "22px",
    border: "2px solid #D8D8D8",
    borderRadius: "16px",
    marginTop: "22px",
    "@media(max-width:767px)": {
      padding: "8px 12px",
    },
  },
  GapBox: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    justifyContent: "start"
  },
  GridBox: {
    display: "grid",
    gap: "25px",
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
  levelMargin: {
    marginTop: "60px",
    marginLeft: "0",
  },
  GridManrgin: {
    padding: "14px 24px !important",
    position: "relative",
  },
  customBorder: {
    padding: "6px",
    borderRadius: "10px",
    border: "2px solid #00BAF2",
    width: "120px",
    height: "51px",
    position: "absolute",
    top: "-16px",
    background: "#fff",
    textAlign: "center",
    cursor: "pointer",
    alignItems: "center",
    display: "grid",
    animation: `${bounce} 1s infinite`,
  },
  textCss: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#00BAF2",
    lineHeight: "19px"
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
  switchChildBox: {
    display: "none",
    "@media(max-width:600px)": {
      display: "block",
    },
  },
  switchChild: {
    display: "flex",
    gap: "10px",
    alignItems: "start"
  },
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
    paddingBottom: "59px",
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
  makeBack: {
    backgroundImage: "url('/images/nameBackground.png')",
    backgroundSize: "cover",
    minHeight: "56px",
    width: "100%",
    textAlign: "center",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px",
    marginBottom: "100px",
    "@media(max-width:767px)": {
      marginTop: "40px",
      marginBottom: "100px",
    },
  },
  rightSidebar: {
    display: { xs: "none", sm: "none", md: "block" }, position: "sticky", top: "0", height: "100vh", paddingTop: "0px !important", paddingBottom: "100px", overflowY: "auto",
  }
};

// const TitleWrapper = styled('img')(({ theme }) => ({
// }));

const StyledImg = styled("img")(({ theme }) => ({
  width: "124px",
  height: "auto",
  marginTop: "-47px"
}));
const TaddyImg = styled("img")(({ theme }) => ({
  width: "115px",
  height: "auto",
}));
const ProfileImg = styled("img")(({ theme }) => ({
  width: "70px",
  height: "70px",
  margin: "0 12px"
}));
const CoinImg = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
}));
const AddImg = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
  "@media(max-width:900px)": {
    maxHeight: "250px",
  },
}));
const LockImg = styled("img")(({ theme }) => ({
  width: "120px",
  height: "120px",
}));
const SkeletonBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  margin: "10px",
  width: "100%",
  height: "80px",
  animation: `loading 1.5s infinite`,
  borderRadius: "68px",
  '@keyframes loading': {
    '0%': {
      backgroundColor: '#e0e0e0',
    },
    '50%': {
      backgroundColor: '#f5f5f5',
    },
    '100%': {
      backgroundColor: '#e0e0e0',
    }
  }
}));

function Dashboard() {
  const User = useContext(UserContext);
  const navigate = useNavigate();
  const [childData, setChildData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [profile, setProfile] = useState("");
  const [targetId, setTargetId] = useState(null);
  useEffect(() => {
    setProfile(User?.profile?.profilePic)
  }, [User.profile])
  const [childOpen, setChildOpen] = useState(false);
  useEffect(() => {
    setChildOpen(User.childOpen)
  }, [User.childOpen])
  const [isLogout, setIsLogout] = useState(false);
  const [isOpen, setIsOpen] = useState([]);
  const handleItemClick = (path) => {
    navigate(path);
  };
  const handleSublistToggle = (index) => {
    const newOpenState = [...isOpen];
    newOpenState[index] = !newOpenState[index];
    setIsOpen(newOpenState);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const iconsFunction = (icon, alt) => {
    return <img src={icon} alt={alt} />;
  };
  const handleClose = () => {
    setChildOpen(false);
    User.setChildOpen(false)
  };
  useEffect(() => {
    getChildData();
  }, [childOpen])

  const getChildData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllChild,
        headers: { token: token },
      });
      if (res.status === 200) {
        setChildData(res.data.data);
        getAllModuleData();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const renderBoxes = (props) => {
    const { levelValue, Name } = props;
    return levelValue.map((level, index) => {
      const isCenterBox = index % 3 === 0;
      const isSixItems = levelValue.length === 6;
      const isFirstBox = index === 0;
      const logvalue = level.current_status ? level : ""
      let justifyContent = "center";

      if (index === 0 || (isSixItems && isCenterBox)) {
        justifyContent = "center";
      } else if (index % 3 === 2) {
        justifyContent = "flex-start";
      } else if (index % 3 === 1) {
        justifyContent = "flex-end";
      }

      return (
        <>
        <Grid
          item
          xs={levelValue.length === 5 && (index === 1 || index === 2 || index === 3 || index === 4) ? 6 : isFirstBox || (isSixItems && isCenterBox) ? 12 : 6}
          key={level._id}
          container
          justifyContent={levelValue.length === 5 && index === 4 ? "flex-start" : levelValue.length === 5 && index === 3 ? "flex-end" : justifyContent}
          sx={style.GridManrgin}
        >
          {level.current_status && (
            <Box
              ref={(el) => (elementsRef.current[removeOrdinalSuffixes(Name)] = el)}
              sx={style.customBorder}
              onClick={() => {
                if (level?.currentQuestionDetails) {
                  navigate("/questions", {
                    state: {
                      module_id: level.module_id,
                      level_id: level._id,
                      nextQuestionNo: level?.currentQuestionDetails?.nextQuestionNo
                    },
                  });
                } else {
                  navigate("/leason", {
                    state: {
                      module_id: level.module_id,
                      level_id: level._id,
                    },
                  });
                }
              }}
            >
              <Typography sx={style.textCss}>START</Typography>
            </Box>
          )}
          <LockImg
            onClick={() => {
              if (level.complete_status || level.current_status) {
                navigate("/leason", {
                  state: {
                    module_id: level.module_id,
                    level_id: level._id,
                  },
                });
              }
            }}
            src={
              level.current_status
                ? "images/play.png"
                : level.complete_status
                  ? `images/level/${level.level_id}.png`
                  : "images/lock.png"
            }
            alt=""
            style={level.complete_status || level.current_status ? { cursor: "pointer" } : {}}
          />
        </Grid>
        </>
      );
    });
  };
  const renderSkeletons = () => {
    return ["0", "1",].map((values, index) => {
      const isCenterBox = index % 3 === 0;
      const isSixItems = 6 === 6;
      const isFirstBox = index === 0;
      let justifyContent = "center";

      if (index === 0 || (isSixItems && isCenterBox)) {
        justifyContent = "center";
      } else if (index % 3 === 2) {
        justifyContent = "flex-start";
      } else if (index % 3 === 1) {
        justifyContent = "flex-end";
      }

      return (<>
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}
        >
          <SkeletonBox style={{ width: "80%" }}></SkeletonBox>
        </Box>
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}
        >
          <SkeletonBox style={{
            borderRadius: "50%",
            width: "100px"
          }}></SkeletonBox>
        </Box>
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}
        >
          <SkeletonBox style={{
            borderRadius: "50%",
            width: "100px"
          }}></SkeletonBox> <SkeletonBox style={{
            borderRadius: "50%",
            width: "100px"
          }}></SkeletonBox>
        </Box>
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}
        >
          <SkeletonBox style={{
            borderRadius: "50%",
            width: "100px"
          }}></SkeletonBox>
        </Box>
      </>
      );
    });
  };
  const switchChild = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.switchChild,
        headers: { token: token },
        params: {
          childId: id
        }
      });
      if (res.status === 200) {
        getChildData()
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getAllModuleData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.allModules,
        headers: { token: token },
      });
      if (res.status === 200) {
        setLevelData(res?.data?.result || [])
        setCurrentData({
          currentLevel: res?.data?.currentLevel,
          currentModule: res?.data?.currentModule,
          currentStandard: res?.data?.currentStandard,
          isStanard: res?.data?.standard,
        })
        setTargetId(`${res?.data?.currentStandard + " " + "Standard"}`);
        //    scroller.scrollTo(`${res?.data?.currentStandard + " " + "Standard"}`, {
        //   duration: 500,
        //   delay: 0,
        //   smooth: 'easeInOutQuart'
        // });


      }
    } catch (error) {
      console.log(error, "error");
      setLevelData([]);
      toast.error("Modules not found.");
    }
  };

  useEffect(() => {

    childData.map((values, items) => {
      if (values.activeStatus) {
        localStorage.setItem("childName", values.childName);
      }
    })
  }, [childData])
  const renderedSections = [
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
  const contentLog = (
    <>
      <Box height="100%" display="flex" flexDirection="column" sx={{ padding: "20px 0px", minWidth: "260px" }}>
        {/* <Box onClick={() => { setChildOpen(false); User.setChildOpen(false) }} sx={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(229, 229, 229, 1)", cursor: "pointer" }}>
          <IoMdArrowBack color={"rgba(182, 183, 184, 1)"} />
          <Typography >
            Back to home
          </Typography>
        </Box> */}
        <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography >
            Profile
          </Typography>
          <Box onClick={() => { navigate("/update-profile") }} sx={{ background: "rgba(230, 248, 254, 1)", padding: "15px", border: "1px solid rgba(51, 200, 245, 1)", borderRadius: "9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <img src={profile ? profile : "images/defaultPic.png"} alt="#" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
              <Typography variant="body1">
                {User?.profile?.name || "--"}
              </Typography>
            </Box>
            <FiEdit3 style={{ color: "rgba(182, 183, 184, 1)", fontSize: "25px" }} />

          </Box>

        </Box>
        <Box pt={2} pb={2} sx={style.mainsidebar}>
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
                          } if (item.title === "Help") {

                            redirectToMail("hello@thecocoapp.com");
                          } else if (item.title === "About") {
                            navigate("/")
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
            sx={style.lightDailogOpen

            }
            open={isLogout}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setIsLogout(false)}
          >
            <DialogContent>
              <Box sx={style.dialougTitle} align="center">
                <Typography
                  variant="h3"
                >
                  Logout
                </Typography>
                <Typography
                  variant="h3"
                >
                  Are you sure you want to log out?
                </Typography>
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
  const content = (
    <>
      <Box height="100%" display="flex" flexDirection="column" sx={childOpen ? { padding: "64px 20px 20px 20px", minWidth: isMobile ? "260px" : "350px" } : { padding: "20px", minWidth: "260px" }}>
        <Box sx={style.BoxStyle}>
          {childData.length > 0 ? <>
            <Typography variant="h4">Switch Profile</Typography>

            <List sx={{ width: '100%' }}>
              {childData.length > 0 && childData.map((value) => {
                return (
                  <ListItem
                    onClick={() => { switchChild(value._id) }}
                    sx={{ width: "100%", border: "solid 1px lightgray", borderRadius: "10px", marginBottom: "10px", padding: "unset", background: value.activeStatus ? "#F1F5F9" : "#fff" }}
                    secondaryAction={
                      <>
                        <Box sx={style.GapBox}>
                          <Typography variant="body1">{value.totalPoints}</Typography>
                          <CoinImg alt="" src="images/Coin.png" />
                        </Box>
                      </>
                    }>
                    <ListItemButton>
                      <img src={value.gender === "Male" ? "images/boyprofile.png" : "images/girlprofile.png"} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", border: value.activeStatus ? "solid 2px green" : "" }} />
                      <ListItemText primary={`${value.childName}`} sx={{ marginLeft: "15px" }} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </> : <Box onClick={() => {
            navigate("/child-profile", {
              state: {
                name: "Add",
                img: "",
                childId: "",
                data: ""
              }
            })
            User.setChildOpen(false)
          }} sx={{ padding: "8px", }}>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LiaUserCircleSolid
                style={{ color: "#D8D8D8", fontSize: "25px" }}
              />
              <Typography variant="body2">Add child</Typography>
            </Box>
          </Box>}
        </Box>
        {contentLog}
      </Box>
    </>
  );

  const getOrdinalSuffix = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = number % 100;
    return number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
  }

  const removeOrdinalSuffixes = (value) => {
    return value.replace(/(\d+)(st|nd|rd|th)/g, '$1');
  }
  const gridRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const scrollTop = gridRef.current.scrollTop;
      }
    };

    const currentRef = gridRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const elementsRef = useRef({});
  useEffect(() => {
    if (targetId && elementsRef.current[targetId]) {
      elementsRef.current[targetId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [targetId]);


  return (
    <Page title="Dashboard">
      <Container ref={gridRef} maxWidth="lg" sx={style.mainscrollHide} >
        <Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={7} sx={{}}>
              {levelData.length !== 0 ?
                levelData.map((values, i) => (
                  <>
                    {(values?.name && currentData?.isStanard) &&
                      <Box sx={style.makeBack} style={i === 0 ? { marginTop: "26px" } : {}}
                        id={removeOrdinalSuffixes(values?.name)}
                      // ref={(el) => (elementsRef.current[removeOrdinalSuffixes(values?.name)] = el)}
                      >
                        <Typography variant="h4" color={"#434547"} sx={{ marginBottom: "7px" }}>{values?.name}</Typography>
                      </Box>}

                    {values.modules.map((data) => (
                      <Box>
                        <Box
                          sx={{
                            background: "rgba(255, 245, 209, 1)",
                            borderRadius: "30px",
                            padding: "0 75px",
                            paddingBottom: "25px",
                            textAlign: "center",
                            marginTop: "47px",
                          }}
                        >
                          <Box>
                            <StyledImg alt="" src={`images/module/${data.module_id}.png`} />
                          </Box>
                          <Box
                            sx={{
                              backgroundImage: "url('/images/moduleNameBack.png')",
                              padding: "6px",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              textAlign: "center",
                              borderRadius: "20px"
                            }}
                          >
                            <Typography
                              variant="h4"
                              color={"#fff"}
                              sx={{ fontWeight: "600" }}
                            >
                              Module {data.module_number ? data.module_number : data.module_id}
                            </Typography>
                          </Box>
                        </Box>
                        <Grid container sx={style.levelMargin}>
                          {renderBoxes({ levelValue: data.levels, Name: values?.name })}
                        </Grid>
                      </Box>
                    ))}
                  </>

                )) : <Box>{renderSkeletons()}</Box>}



            </Grid>
            <Grid item xs={12} sm={12} md={5} sx={{ padding: "0 30px " }}>
              <Box className="right-sidebar" sx={{ ...style.GridBox, ...style.rightSidebar }}>
                <Box sx={style.BoxStyle}>
                  <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }} >
                    <TaddyImg src="images/Coco-Hello_Talking.gif" alt="#" />
                    <Box>
                      <Typography variant="h3" fontWeight={"700"} mb={1} color={"#4B4B4B"}>
                        Hey I am Coco!
                        {/* {childData.map((values, items) => {
                          if (values.activeStatus){
                            return values.childName
                          }
                        })} */}
                      </Typography>
                      <Typography variant="h4" color={"#777777"}>
                        Happy learning! You’ re on {getOrdinalSuffix(currentData?.currentModule)} module {getOrdinalSuffix(currentData?.currentLevel)} level.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {childData.length > 0 ?
                  <Box sx={{ ...style.BoxStyle }}>
                    <Typography variant="h4" fontWeight={"600"} color={"#000"}>Switch Profile</Typography>
                    {/* {childData.map((values, items) => {
                      return (
                        <Box sx={style.profileBox} onClick={() => { switchChild(values._id) }}>
                          <Box
                            style={values.activeStatus ? {
                              background: "rgba(241, 245, 249, 1)", cursor: "pointer"
                            } : { background: "rgba(255, 255, 255, 1)", cursor: "pointer" }}
                            sx={style.userBox}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <ProfileImg alt="" src={
                                values.profilePic ? values.profilePic :
                                  values.gender === "Male" ? "images/boyprofile.png" : "images/girlprofile.png"} />
                              <Box > <Typography variant="body1">{values.childName}</Typography>
                                <Box sx={style.GapBox}>
                                  <Typography variant="body1">{values.totalPoints}</Typography>
                                  <CoinImg alt="" src="images/Coin.png" />
                                </Box></Box></Box>
                          </Box>
                        </Box>)
                    })} */}

                    <List sx={{ width: '100%' }}>
                      {childData.length > 0 && childData.map((value) => {
                        return (
                          <ListItem
                            onClick={() => { switchChild(value._id) }}
                            sx={{ width: "100%", border: "solid 1px lightgray", borderRadius: "10px", marginBottom: "10px", padding: "unset", background: value.activeStatus ? "#F1F5F9" : "#fff" }}
                            secondaryAction={
                              <>
                                <Box sx={style.GapBox}>
                                  <Typography variant="body1">{value.totalPoints}</Typography>
                                  <CoinImg alt="" src="images/Coin.png" />
                                </Box>
                              </>
                            }>
                            <ListItemButton>
                              <img src={value.gender === "Male" ? "images/boyprofile.png" : "images/girlprofile.png"} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", border: value.activeStatus ? "solid 2px green" : "" }} />
                              <ListItemText primary={`${value.childName}`} sx={{ marginLeft: "15px" }} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>

                  </Box> :
                  <Box sx={{ ...style.BoxStyle }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/child-profile", {
                          state: {
                            name: "Add",
                            img: "",
                            childId: "",
                            data: ""
                          }
                        })
                        User.setChildOpen(false)
                      }}
                    >
                      <LiaUserCircleSolid
                        style={{ color: "#D8D8D8", fontSize: "25px" }}
                      />
                      <Typography variant="body2">Add child</Typography>
                    </Box>
                  </Box>
                }
                <Box sx={{ ...style.BoxStyle }}>
                  <AddImg alt="" src="images/add.png" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Drawer open={childOpen}
        onClose={() => handleClose()}
        anchor="right"
      >
        {content}
      </Drawer>

    </Page>
  );
}

export default Dashboard;