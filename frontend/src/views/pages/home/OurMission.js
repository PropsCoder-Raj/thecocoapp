import React from "react";
import { Box, Typography, Container, Grid, } from "@mui/material";
import styled from "@emotion/styled";



const style = {
  mappedBox: {
    display: "grid",
    gap: "30px",
    "@media(max-width:767px)": {
      gap: "15px",
    },
  },
  HandleMargin: {
    margin: "40px 0",
    "@media(max-width:1000px)": {
      margin: "30px 0",
    },
    "@media(max-width:767px)": {
      margin: "20px 0",
    },
  },
  DesignBox: {
    background: "#E5D5FD",
    padding: "5px",
    maxWidth: "125px",
    borderRadius: "20px",
    marginBottom: "10px",
  },
};
const StyledImg = styled("img")(({ theme }) => ({
  width: "-webkit-fill-available",
  height: "auto",
}));
const CustomBox = styled("div")(({ theme }) => ({
  width: "-webkit-fill-available",
  padding: "20px",
  background: "#B186F3",
  borderRadius:"20px"
}));
function OurMission() {

    const CardData = [
      {
        text: "⭐ Access to the bit sized gamified lessons from experienced financial professionals",
      },
      {
        text: "⭐ Children learn techniques they can use in real life",
      },
      {
        text: "⭐ Practice quizzes and earns coins help you reach your financial goals faster",
      },
    ];
  return (
    <Container maxWidth="lg">
      <Box sx={style.HandleMargin}>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <Box mt={2}>
              <StyledImg alt="" src="images/ourMission.png" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box mt={2} sx={style.mappedBox}>
              <CustomBox>
                <Box sx={style.DesignBox}>
                  <Typography variant="body2" fontWeight={400}>🏆 Our Mission</Typography>
                </Box>
                <Typography variant="h2" sx={{ color: "#fff", fontWeight:{xs:"500", sm:"600", md:"600", lg:"600"} }}>
                  To make financial literacy accessible and engaging for all
                  children. We believe that it is a crucial life skill that
                  should be nurtured from a young age.
                </Typography>
              </CustomBox>
              <Box>
                <Typography variant="h2">
                  Cocoapp is more than just an app; it's a gateway to a brighter
                  financial future for children.
                </Typography>
                <Typography variant="h5" sx={{ marginTop: "8px" }}>
                  The right support at the right time makes all the difference.
                </Typography>
              </Box>

              <Box sx={style.innerBox}>
                {CardData.map((value, index) => {
                  return (
                    <Typography variant="h6" sx={{ marginTop: "5px" }}>
                      {value.text}
                    </Typography>
                  );
                })}{" "}
              </Box>
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
              <StyledImg alt="" src="images/ourMission.png" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default OurMission;
