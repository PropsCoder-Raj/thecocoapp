import React from "react";
import PropTypes from "prop-types";
import {  Box, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import styled from "@emotion/styled";
const styles = {
  mainScreenBack:{
    overflow: "auto", height: "100vh"
  },
  content: {
    minHeight: "500px",
    borderRadius: "10px",
    minWidth: "430px",
    padding: "28px",
    color: "#1A1919",
    margin: "auto 0 auto 50px",
    background: "#FFF",
    border: "1px solid rgba(229, 229, 229, 1)",
    "@media(max-width:600px)": {
      padding: "0 0px",
    },
    "@media(max-width:900px)": {
      margin: "0px 10px",
      border: "none",
      padding: "0 0px",
      minWidth:"auto"
    },
  },
  logo: {
    cursor: "pointer",
    maxWidth: "155px",
  },
  boxMnage: {
    margin: "auto 50px auto 50px",
    "@media(max-width:900px)": {
      display: "none",
    },
  },
  mainBox: {
    height: "100vh",
    alignItems: "center",
    display: "flex",
    paddingTop: "62px",
    "@media(max-width:900px)": {
      display: "grid",
      alignItems: "baseline"
    },
  },
};

const ImageGroup = styled("img")({
  width: "100%",
});
const ImageLayOut = styled("img")({
  width: "100%",
  maxWidth: "170px",
  marginTop: "-30px",
  display:"none",
  "@media(max-width:900px)": {
    display: "block",
  },
});
const ManageLayout = styled(Box)({
  background: "rgb(255 253 243)",
  minHeight: "500px",
  border: "1px solid #E5E5E5",
  borderRadius: "10px",
});

const LoginLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={styles.mainScreenBack} >
      <TopBar />
      <Container >
        <Box sx={styles.mainBox}>
          <Box sx={styles.boxMnage}>
            <ManageLayout>
              <ImageGroup alt="" src="images/loginBack.png" />
            </ManageLayout>
          </Box>
          <Box sx={styles.content}>
            <Box sx={{display:"flex", justifyContent:"center"}}>
              <ImageLayOut alt="" src="images/mobileLayOut.png" />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={() => navigate("/")}
            >
              {location.pathname === "/add-child" ? (
                ""
              ) : (
                <img style={styles.logo} src="images/Logo.png" alt="" />
              )}
            </Box>
            <Box>{children}</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
