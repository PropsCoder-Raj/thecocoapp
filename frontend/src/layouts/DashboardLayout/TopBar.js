import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
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
    minWidth: "120px",
    background: "#D19A1D",
    padding: "22px 26px",
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
    >
      <Toolbar sx={styles.toolbar}>
        <TopBarData onMobileNavOpen={onMobileNavOpen}/>
      </Toolbar>
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

export function TopBarData({onMobileNavOpen}) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
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
        {isMobile && 
          <IconButton
            color="#FF2626"
            onClick={()=>onMobileNavOpen()}
            style={{ marginRight: 10 }}
          >
            
            <IoMenu
               style={{color:"black"}}
              />
     
          </IconButton>}
        
       
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
          <Box sx={`${styles.customSelectBox}`} onClick={() => navigate("/update-profile")}>
            <Typography variant="h4">Logout</Typography>
            <img src="images/profile.png" alt="#" style={{width:"45px", height:"45px"}}/>
          </Box>
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
