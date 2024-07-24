import React from "react";
import { Box, Container, keyframes, Typography } from "@mui/material";
const style = {
  mainBox: {
    display: "grid",
    gap: "20px",
    margin: "50px auto",
    maxWidth: "660px",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
    },
    "@media(max-width:1000px)": {
      margin: "50px auto",
    },
    "@media(max-width:767px)": {
      margin: "30px auto",
    },
  },
};
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
function Feedback() {
  return (
    <Container maxWidth="lg">
      <Box sx={style.mainBox}>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "center", md: "start" },
          }}
        >
          <img src="images/doubleCote.svg" alt="#" />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontWeight: {
              xs: "600",
              sm: "800",
            },
          }}
        >
          “If we can change the beginning of the story, we can change the whole
          story”
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: {
              xs: "400",
              sm: "600",
              md: "600",
              lg: "600",
              xl: "600",
            },
          }}
        >
          That is what we dream of doing for millions of children worldwide.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: { xs: "500", sm: "700" } }}>
          — Soham Aher, Founder
        </Typography>
      </Box>
    </Container>
  );
}

export default Feedback;
