import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsContext from "src/context/SettingsContext";
import { AuthContext } from "src/context/Auth";
import { UserContext } from "src/context/User";
import ConfirmationDialog from "src/component/ConfirmationDialog";
import { useTheme } from "@emotion/react";
import { IoMenu } from "react-icons/io5";
import { HiSwitchVertical } from "react-icons/hi";


const styles ={
  root: {
    backgroundColor: "#232B3B;",
  },

  logo: {
    maxWidth: "150px",
    // marginRight: theme.spacing(2),
    "@media(max-width:599px)": {
      maxWidth: "120px",
    },
  },

  searchBox: {
    display:"flex",
    gap:"15px",
    alignItems:"center"
    // "@media(max-width:900px)": {
    //   display: "none",
    // },
  },
  customSelectBox: {
    cursor: "pointer",
    display: "flex",
    gap: "10px",
    justifyContent: "space-evenly",
    alignItems: "center",
  
    "& .contentTypo": {
      color: "rgb(23, 38, 36)",
      display: "flex",
      textTransform: "uppercase",
      fontFamily: "'Nunito Sans', sans-serif",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "16px",
      cursor: "pointer",
    },
  },
  toolbar: {
    paddingRight: "0px !important",
    display: "flex",
    justifyContent: "space-between",
  },
};

const TopBar = ({ sx, onMobileNavOpen, ...rest }) => {

  const themeSeeting = useContext(SettingsContext);

  return (
    
    <AppBar
      style={{
        height: "64px",
        justifyContent: "center",
        zIndex:"1201"
      }}
    ><Container maxWidth="lg">
      <Toolbar sx={styles.toolbar}>
        <TopBarData onMobileNavOpen={onMobileNavOpen} />
      </Toolbar>
      </Container>
    </AppBar>
    
  );
};

TopBar.propTypes = {
  sx: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData({ onMobileNavOpen }) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const User = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileChild = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [profile, setProfile] = useState("");
  useEffect(()=>{
    setProfile(User?.profile?.profilePic)
  }, [User.profile])
  const confirmationHandler = () => {
    setOpen(false);
    navigate("/login");
    auth.userLogIn("", false);
    handleLogOut();
    window.localStorage.removeItem("token");
    window.localStorage.clear();
  };

  const handleLogOut = async (values) => {
    try {
     
    } catch (error) {
      // Handle error here
    }
  };

 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <>
      {/* {isMobile && (location.pathname == "/update-profile" || location.pathname == "/child-profile")  &&
          <IconButton
            color="#FF2626"
            onClick={()=>onMobileNavOpen()}
            style={{ marginRight: 10 }}
          >
            
            <IoMenu
            style={{ color:"rgba(182, 183, 184, 1)"}}
              />
     
          </IconButton>} */}
        
       
      <img
        alt=""
        style={styles.logo}
        src="/images/Logo.png"
        onClick={() => {
          navigate("/");
        }}
      />

      <>
        <Box flexGrow={1} />
        <Box sx={styles.searchBox}>
          {!isMobileChild &&
            <Box sx={styles.customSelectBox} onClick={() => navigate("/update-profile")}
              style={{
                alignItems: "center",
                display: "grid",
                marginRight: "10px"
              }}
            >
              {/* <Typography variant="h4">Logout</Typography> */}
              <img src={profile ? profile : "images/defaultPic.png"} alt="#" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
            </Box>
          }
          {isMobileChild && 
            <Box sx={styles.customSelectBox} onClick={() => { User.setChildOpen(!User.childOpen)}}
            style={{
              alignItems: "center",
          display: "grid",
          marginRight: "10px"
            }}
            >
            {/* <Typography variant="h4">Logout</Typography> */}
            <img src={profile ? profile: "images/defaultPic.png"} alt="#" style={{width:"45px", height:"45px",borderRadius:"50%"}}/>
          </Box>
          }
        </Box>
      </>

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
}
