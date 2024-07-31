import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";
import { MdMenu as MenuIcon } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import Scroll from "react-scroll";
import { styled } from "@mui/system";
import { LuMail } from "react-icons/lu";
import { redirectToMail } from "src/utils";

const ScrollLink = Scroll.Link;

const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: "block",
  position: "fixed",
  width: "-webkit-fill-available",
  zIndex: "1",
  // [theme.breakpoints.down("md")]: {
  //   display: "none",
  // },
}));

const Root1 = styled("div")(({ theme }) => ({
  display: "none",
  // [theme.breakpoints.down("md")]: {
  //   display: "block",
  // },
}));

const ToolbarStyled = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});



const Logo = styled("img")({
  maxWidth: "130px",
});

const RegisterBox = styled(Box)({
  display: "flex",
  gap: "15px",
});

const BackgroundDiv = styled("div")(({ theme }) => ({
  background: "#F3F8FB",
  padding: "8px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const styles = {
  flexDiv: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
};
export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openDrawerContent, setOpenDrawerContent] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [webPath, setWebPath] = useState(location.pathname);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {

    setOpen(false);
  };

  useEffect(() => {
    setWebPath(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (token) {
      setLogIn(true);
    } else {
      setLogIn(false);
    }
  }, [token]);

  const handleDrawerOpen = () => {
    setOpenDrawerContent(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawerContent(false);
  };

  return (
    <>
      <Root >
        <BackgroundDiv>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Box
                style={{ cursor: "pointer" }}
                sx={styles.flexDiv}
                onClick={() => {
                  redirectToMail(
                    "hello@thecocoapp.com",
                  );
                }}
              >
                <LuMail />
                <Typography variant="body2">hello@thecocoapp.com</Typography>
              </Box>
              <Box
                style={{ cursor: "pointer" }}
                sx={styles.flexDiv}
                onClick={() => {
                  redirectToMail(
                    "edupartners@thecocoapp.com",
                  );
                }}
              >
                <LuMail />
                <Typography variant="body2">
                  edupartners@thecocoapp.com
                </Typography>
              </Box>
            </Box>
          </Container>
        </BackgroundDiv>
        <AppBar position="static" style={{ borderTop: "unset" }}>
          <Container maxWidth="lg">
            <ToolbarStyled style={{ padding: "0" }}>
              <Box display="flex" alignItems="center" gap="32px">
                <Logo
                  src="/images/Logo.png"
                  onClick={() => {
                    navigate("/");
                  }}
                />
                {/* <LinkButtonsDiv>
                <LinkButton>
                  <ScrollLink
                    onClick={() => {
                      navigate("/");
                    }}
                    smooth
                    duration={500}
                    to="home-bar"
                  >
                    <span style={webPath === "/" ? { color: "#D19A1D" } : {}}>
                      Home
                    </span>
                  </ScrollLink>
                </LinkButton>
              </LinkButtonsDiv> */}
              </Box>
              <RegisterBox>
                {logIn && <Button variant="contained" onClick={() => {
                      navigate("/dashboard");
                    }}>Dashboard</Button>}
                {!logIn && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/login");
                      // handleClick({ vertical: "bottom", horizontal: "center" });
                    }}
                  >
                    Get Started
                  </Button>
                )}
                {/* {!logIn && (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </Button>
              )} */}
              </RegisterBox>
            </ToolbarStyled>
          </Container>
        </AppBar>
      </Root>
      <Root1>
        <AppBar position="static">
          <ToolbarStyled>
            <Box display="flex" alignItems="center" gap="32px">
              <Logo
                src="/images/Logo.png"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Box>
            <MenuIcon
              onClick={handleDrawerOpen}
              style={{ cursor: "pointer", fontSize: "28px" }}
            />
            <Drawer
              sx={{
                "& .MuiDrawer-paper": {
                  width: 300,
                  padding: "24px 10px",
                  justifyContent: "space-between",
                },
              }}
              anchor="right"
              open={openDrawerContent}
              onClose={handleDrawerClose}
            >
              <Grid>
                <List>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Logo
                      src="/images/Logo.png"
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                    <MenuIcon
                      onClick={handleDrawerClose}
                      style={{ cursor: "pointer", fontSize: "28px" }}
                    />
                  </ListItem>
                  {/* <ListItem
                    onClick={() => {
                      navigate("/");
                    }}
                 
                  >
                    Home
                  </ListItem> */}
                  {logIn && (
                    <ListItem
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Dashboard
                    </ListItem>
                  )}
                  {!logIn && (
                    <Button
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      {" "}
                      Get Started
                    </Button>
                  )}
                </List>
              </Grid>
            </Drawer>
          </ToolbarStyled>
        </AppBar>
      </Root1>
      <Snackbar
        ContentProps={{
          sx: {
            background: "rgba(20, 23, 25, 1)",
          },
        }}
        bodyStyle={{  minWidth: "300px"}}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cocoapp Launches in July!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // action={action}
      />
    </>
  );
}
