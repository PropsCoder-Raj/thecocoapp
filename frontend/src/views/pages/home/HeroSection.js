import React, { useState } from "react";
import { Box, Button, Container, Grid, keyframes, Snackbar, Typography } from "@mui/material";
import styled from "@emotion/styled";

const style = {
  HandleMargin: {
    marginTop: "20px",
    marginBottom: "80px",
    minWidth:"260px",
    "@media(max-width:1000px)": {
      marginBottom: "60px",
    },
    "@media(max-width:767px)": {
      marginTop: "15px",
      marginBottom: "30px",
      minWidth: "220px",
    },
  },

  EnergyIconPosition: {
    position: "absolute",
    zIndex: -1,
    // top: "2%",
    "@media(min-width: 1200px)": {
      left: "-3%",
    },
    "@media(min-width: 992px) and (max-width: 1199px)": {
      left: "-3%",
    },
    "@media(min-width: 768px) and (max-width: 991px)": {
      left: "-3%",
    },
    "@media(max-width: 767px)": {
      left: "2%",
    },
  }
};

// const TitleWrapper = styled('img')(({ theme }) => ({
// }));


const StyledImg = styled("img")(({ theme }) => ({
  width: "-webkit-fill-available",
  height: "auto",
}));
const DeskTopTitle = styled("h1")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "56px",
  fontFamily: "'Nunito Sans', sans-serif",
  margin:"0",
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
function HeroSection() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  return (
    <Container maxWidth="lg">
      <Box>
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
            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <StyledImg alt="heroSection" src="images/boyWithMobile.png" />
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
            <DeskTopTitle>
              Helping children to make smart money choices !
            </DeskTopTitle>
            <Typography variant="h5">
              Start them young! Cocoapp equips children with the financial
              knowledge they need to make smart choices.
            </Typography>
            <Button
              onClick={() => {
                
                handleClick()
              }}
              variant="contained"
              sx={style.HandleMargin}
            >
              Get started
            </Button>
            <Box sx={{
              display: 'inline-block',
              animation: `${rotate} 5s linear infinite`,
              position:"relative",
              zIndex:"-1",
              top:{
                md:"0",
                sm:"-174px",
                xs:"-185px"
              },
              float:{
                md: "none",
                sm: "inline-end",
                xs: "inline-end"
              }
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
                lg: "block",
              },
            }}
          >
            <Box>
              <StyledImg alt="heroSection" src="images/boyWithMobile.png" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        ContentProps={{
          sx: {
            background: "rgba(20, 23, 25, 1)",
          },
        }}
        bodyStyle={{ minWidth: "300px" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cocoapp Launches in July!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // action={action}
      />
    </Container>
  );
}

export default HeroSection;
