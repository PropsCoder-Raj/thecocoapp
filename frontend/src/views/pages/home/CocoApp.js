import React from "react";
import { Box, Button, Container, Grid, keyframes, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { redirectToMail } from "src/utils";

const StyledImg = styled("img")(({ theme }) => ({
  width: "-webkit-fill-available",
  height: "auto",
}));
const DeskTopTitle = styled("h1")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "56px",
  fontFamily: "'Nunito Sans', sans-serif",
  margin: "0",
  lineHeight: "72px",
  [theme.breakpoints.down("md")]: {
    fontSize: "42px",
    lineHeight: "58px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
    lineHeight: "42px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "26px",
    lineHeight: "38px",
  },
}));
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust this value to control the bounce height */
  }
`;
function CocoApp() {


  return (
    <Container maxWidth="lg">
      <Box mt={3} mb={3}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
              },
            }}
          >
            <Box>
              <StyledImg alt="heroSection" src="images/schoolTeacher.png" />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                md: "start",
              },
            }}
          >


            {/* <Box sx={{ position: "relative", animation: `${bounce} 1s infinite`, zIndex: "-1",}}>

              <img
              alt=""
              className="positionAbosolute EnergyIconPositionContactSection"
              src="images/energy-icon.svg"
              style={{ top: "unset !important" }}
            />
            </Box> */}
            
            <Box sx={{ display: "grid", gap: "20px" }}>
              <DeskTopTitle>
                Cocoapp
                <br /> for Schools
              </DeskTopTitle>
              <Box sx={{ maxWidth: {xs:"auto",sm:"auto", md:"493px"} }}>
                <Typography variant="h6">
                  Teachers, we’re here to help you! Our free tools support your
                  students as they learn finance through the Cocoapp, both in
                  and out of the classroom.
                </Typography>
              </Box>
              <Button
                onClick={() => redirectToMail("edupartners@thecocoapp.com")}
                variant="contained"
                sx={{
                  margin: { xs: "auto", sm: "auto", md: "0" },
                  width: "260px",
                }}
              >
                Contact us
              </Button>
            </Box>
            <Box sx={{
              display: 'inline-block',
              animation: `${rotate} 5s linear infinite`,
              position: "relative",
              zIndex: "-1",
             
            }}>
              <img
                className="positionAbosolute StarIconPosition"
                src="images/star-icon.svg"
                alt=""
              /></Box>
           
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <Box>
              <StyledImg alt="heroSection" src="images/schoolTeacher.png" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CocoApp;
