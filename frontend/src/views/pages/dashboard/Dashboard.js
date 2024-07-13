import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Collapse, Container, Dialog, DialogActions, DialogContent, Drawer, Grid, List, ListItem, ListItemText, ListSubheader, Slide, Typography } from "@mui/material";
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
  BoxStyle: {
    padding: "22px",
    border: "2px solid rgba(216, 216, 216, 1)",
    borderRadius: "16px",
    "@media(max-width:767px)": {
      marginTop: "15px",
      padding: "8px 12px",
    },
  },
  GapBox: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    justifyContent:"start"
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
    "@media(max-width:767px)": {
      marginTop: "40px",
    },
  },
  GridManrgin: {
    padding: "20px 40px !important",
    position: "relative",
  },
  customBorder: {
    padding: "6px",
    borderRadius: "10px",
    border: "2px solid #00BAF2",
    width: "105px",
    height: "51px",
    position: "absolute",
    top: "-16px",
    background: "#fff",
    textAlign: "center",
    cursor:"pointer"
  },
  textCss: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#00BAF2",
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
  switchChildBox:{
display:"none",
    "@media(max-width:600px)": {
      display: "block",
    },
  },
  switchChild:{
    display:"flex",
    gap:"10px", 
    alignItems:"start"
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
};

// const TitleWrapper = styled('img')(({ theme }) => ({
// }));

const StyledImg = styled("img")(({ theme }) => ({
  width: "124px",
  height: "auto",
  marginTop:"-47px"
}));
const TaddyImg = styled("img")(({ theme }) => ({
  width: "115px",
  height: "auto",
}));
const ProfileImg = styled("img")(({ theme }) => ({
  width: "70px",
  height: "70px",
  margin:"0 12px"
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
function Dashboard() {
  const navigate = useNavigate();
  const [childData, setChildData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const User = useContext(UserContext);
  const [childOpen, setChildOpen] =useState(false);
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
  const levels = [
    {
      _id: "6679a728f2eac92152686fb5",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 1,
      name: "What is Money?",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: true,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fb6",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 2,
      name: "History of Money",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: true,
    },
    {
      _id: "6679a728f2eac92152686fb7",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 3,
      name: "Different Types of Money",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fb8",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 4,
      name: "The Value of Money",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fb9",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 5,
      name: "How Money is Made",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fba",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 6,
      name: "Money Around the World",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
  ];
  const iconsFunction = (icon, alt) => {
    return <img src={icon} alt={alt} />;
  };
  const handleClose = () => {
    setChildOpen(false)
  };
useEffect(()=>{
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

  const renderBoxes = (levelValue) => {
    return levelValue.map((level, index) => {
      const isCenterBox = index % 3 === 0;
      const isSixItems = levelValue.length === 6;
      const isFirstBox = index === 0;
      let justifyContent = "center";

      if (index === 0 || (isSixItems && isCenterBox)) {
        justifyContent = "center";
      } else if (index % 3 === 2) {
        justifyContent = "flex-start";
      } else if (index % 3 === 1) {
        justifyContent = "flex-end";
      }

      return (
        <Grid
          item
          xs={isFirstBox || (isSixItems && isCenterBox) ? 12 : 6}
          key={level._id}
          container
          justifyContent={justifyContent}
          sx={style.GridManrgin}
        >
          {level.current_status && (
            <Box
              sx={style.customBorder}
              onClick={() => {
                navigate("/leason", {
                  state: {
                    module_id: level.module_id,
                    level_id: level._id,
                  },
                });
              }}
            >
              <Typography sx={style.textCss}>START</Typography>
            </Box>
          )}
          <LockImg
            onClick={() => {
              if (level.complete_status) {
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
            style={level.complete_status ? { cursor: "pointer" } : {}}
          />
        </Grid>
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
        params:{
          childId :id
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
      }
    } catch (error) {
      console.log(error, "error");
      setLevelData([]);
      toast.error("Modules not found.");
    }
  };

  useEffect(()=>{
    
      childData.map((values, items) => {
        if (values.activeStatus){
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
        <Box onClick={() => { setChildOpen(false) }} sx={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(229, 229, 229, 1)", cursor: "pointer" }}>
          <IoMdArrowBack color={"rgba(182, 183, 184, 1)"} />
          <Typography >
            Back to home
          </Typography>
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
      <Box height="100%" display="flex" flexDirection="column" sx={childOpen ?{
        padding: "64px 20px 20px 20px", minWidth: "260px" 
      }:{ padding: "20px", minWidth: "260px" }}>
        <Box sx={style.BoxStyle}>
          <Typography variant="h4">Switch Profile</Typography>
          {childData.map((values, items) => {
            return (
              <Box sx={style.profileBox} key={items} onClick={() => switchChild(values._id)}>
                <Box
                  style={
                    values.activeStatus
                      ? { background: "rgba(241, 245, 249, 1)", cursor: "pointer" }
                      : { background: "rgba(255, 255, 255, 1)", cursor: "pointer" }
                  }
                  sx={style.userBox}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <ProfileImg
                      alt=""
                      src={
                        values.profilePic
                          ? values.profilePic
                          : values.gender === "Male"
                            ? "images/boyprofile.jpg"
                            : "images/girlprofile.jpg"
                      }
                    />
                    <Box>
                      <Typography variant="body1">{values.childName}</Typography>
                      <Box sx={style.GapBox}>
                        <Typography variant="body1">{values.totalPoints}</Typography>
                        <CoinImg alt="" src="images/Coin.png" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        {contentLog}
      </Box>
    </>
  );
 
  return (
    <Page title="Dashboard">
      <Container maxWidth="lg">
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sx={style.switchChildBox}>
              <Box sx={{display:"flex", justifyContent:"end"}}>
                <Button variant="contained" onClick={() => { setChildOpen(true) }}><HiSwitchHorizontal />Switch</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
             
              {levelData.map((values) => (
                <>
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
                            borderRadius:"20px"
                          }}
                        >
                          <Typography
                            variant="h4"
                            color={"#fff"}
                            sx={{ fontWeight: "600" }}
                          >
                            Module {data.module_id}
                          </Typography>
                        </Box>
                      </Box>
                      <Grid container spacing={3} sx={style.levelMargin}>
                        {renderBoxes(data.levels)}
                      </Grid>
                    </Box>
                  ))}
                </>
              ))}
                
             
            
            </Grid>
            <Grid item xs={5} sx={{ display: { xs: "none", sm: "block" } }}>
              <Box sx={style.GridBox}>
                <Box sx={style.BoxStyle}>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <TaddyImg alt="" src="images/TaddyIcon.png" />
                    <Box>
                      <Typography variant="h3" fontWeight={"700"} mb={1}>
                        Hello {childData.map((values, items) => {
                          if (values.activeStatus){
                            return values.childName
                          }
                        })}
                      </Typography>
                      <Typography variant="h4">
                        Happy learning! Complete one level daily to top !
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={style.BoxStyle}>
                  <Typography variant="h4">Switch</Typography>
                  {childData.map((values, items)=>{
                    return(
                      <Box sx={style.profileBox} onClick={() => { switchChild(values._id)}}>
                      <Box
                          style={values.activeStatus ?{
                            background: "rgba(241, 245, 249, 1)",cursor:"pointer"
                          } : { background: "rgba(255, 255, 255, 1)", cursor: "pointer" }}
                        sx={style.userBox}
                      >
                        <Box sx={{display:"flex", alignItems:"center", gap:"10px"}}>
                          <ProfileImg alt="" src={
                              values.profilePic ? values.profilePic :
                            values.gender == "Male" ? "images/boyprofile.jpg" : "images/girlprofile.jpg"} />
                            <Box > <Typography variant="body1">{values.childName}</Typography>
                        <Box sx={style.GapBox}>
                            <Typography variant="body1">{values.totalPoints}</Typography>
                          <CoinImg alt="" src="images/Coin.png" />
                              </Box></Box></Box>
                      </Box>
                  </Box>)
                  })}
                 
                </Box>
                <Box sx={style.BoxStyle}>
                  <AddImg alt="" src="images/add.png" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

        <Drawer open={childOpen}
          onClose={()=>handleClose()}
        anchor="right"
          >
          {content}
        </Drawer>
     
    </Page>
  );
}

export default Dashboard;
