import React, { useState } from "react";
import { Box, Container, Grid, Typography, Button, Snackbar, keyframes } from "@mui/material";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";

const style = {
  mappedBox: {
    display: "grid",
    gap: "30px",
  },
  paperBox: {
    display: "flex",
    gap: "16px",
    alignItem: "center",
    padding: "20px",
    "@media(max-width:600px)": {
      display: "block",
    },
  },
  innerBox: {
    display: "grid",
    gap: "8px",
  },
  handleimgPosiotion: {
    marginTop: "40px",
  },
  HandleMargin: {
    marginTop: "40px",
    marginBottom: "60px",
    "@media(max-width:1000px)": {
      marginTop: "30px",
      marginBottom: "40px",
    },
    "@media(max-width:767px)": {
      marginTop: "20px",
      marginBottom: "20px",
    },
  },
  
};
const HandleBox = styled("div")(({ theme }) => ({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  "@media(max-width:900px)": {
    marginTop: "0px",
  },
}));
const StyledImg = styled("img")(({ theme }) => ({
  width: "-webkit-fill-available",
  height: "auto",
}));
const StyledImgM = styled("img")(({ theme }) => ({
  width: "-webkit-fill-available",
  height: "auto",
  marginTop: "4vw",
  "@media(max-width:600px)": {
    marginTop: "0px",
  },
  
}));
const BoxCenter = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
function FreeFunEffective() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      setOpen(false);
    };
  const CardData = [
    {
      title: "Gamified modules",
      cardText:
        "It uses interactive games and engaging activities to make financial literacy fun. It's not just learning, it's an adventure!",
      img: "images/IconGrid.png",
    },
    {
      title: "Bit-sized lessons",
      cardText:
        "Short, engaging lessons break down complex financial concepts into easy-to-understand chunks. No overwhelming information here!",
      img: "images/IconGrid1.png",
    },
    {
      title: "Practical based quizzes",
      cardText:
        "Its quizzes go beyond memorisation. They apply what you learn to real-world situations, helping you master financial skills. ",
      img: "images/IconGrid2.png",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={style.HandleMargin}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{
              display: 'inline-block',
              animation: `${rotate} 5s linear infinite`,
              position: "relative",
              // zIndex: "-1",
              top: {
                md: "0",
                sm: "0px",
                xs: "0px"
              },
              float: {
                md: "inline-end",
                sm: "inline-end",
                xs: "inline-end"
              }
            }}>
              <img
                src="images/Vector.svg"
                alt=""
              /></Box>
            <BoxCenter>
              <Typography variant="h1">Free Fun Effective</Typography>
            </BoxCenter>
            
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
            <Box sx={style.handleimgPosiotion}>
              <StyledImgM alt="" src="images/Finalized.gif" />
              {/* <video src="images/Finalized.mp4" autoPlay loop style={{ width:"-webkit-fill-available"}}/>   */}
                        </Box>

          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box mt={2} sx={style.mappedBox}>
              {CardData.map((value, index) => {
                return (
                  <Paper
                    sx={{
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Box sx={style.paperBox}>
                      <img
                        src={value.img}
                        alt="icon"
                        style={{ width: "64px", height: "64px" }}
                      />
                      <Box sx={style.innerBox}>
                        <Typography variant="h3">{value.title}</Typography>
                        <Typography variant="h6">{value.cardText}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Grid>
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
            <Box mt={2}>
              <StyledImg alt="" src="images/mobileScreen.gif" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <HandleBox>
              <Button
                variant="contained"
                onClick={() => {handleClick()}}
                sx={{ minWidth: "260px" }}
              >
                Get started
              </Button>
            </HandleBox>
            <Box sx={{
              display: 'inline-block',
              animation: `${rotate} 5s linear infinite`,
              position: "relative",
              zIndex: "1",
              top: {
                md: "0",
                sm: "0px",
                xs: "0px"
              },
              float: {
                md: "inline-end",
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

export default FreeFunEffective;
