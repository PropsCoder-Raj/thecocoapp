import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Hidden, SvgIcon, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "react-feather";
import { TopBarData } from "src/layouts/DashboardLayout/TopBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/Auth";



const styles = {
  root: {
    background: "transparent",
  },
  toolbar: {
    background: "#2A2A2B !important",
    height: "60px",
    padding: "10px 27px 10px 27px",
    "& svg": {
      fontSize: "25px !important",
    },
  },
  logo: {
    // marginRight: theme.spacing(2),
  },
  link: {
    // fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      // marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
  },
};

const TopBar = ({ sx, onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const confirmationLogouthandler = () => {
    navigate("/login");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
  };
  useEffect(() => {
    const id = window.localStorage.getItem("token");
    if (!id) {
      confirmationLogouthandler();
    }
  }, []);
  return (
    <>
    
      <AppBar
        elevation={0}
        sx={clsx(styles.root, sx)}
        color="inherit"
        {...rest}
      >
        <Toolbar sx={styles.toolbar}>
          {isMobile && (
            <IconButton
              color="#FF2626"
              onClick={onMobileNavOpen}
              style={{ marginRight: 10 }}
              size="large"
            >
              <SvgIcon fontSize="small">
                <MenuIcon  />
              </SvgIcon>
            </IconButton>
          )}
          <TopBarData />
        </Toolbar>
      </AppBar>
    </>
  );
};

TopBar.propTypes = {
  sx: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
