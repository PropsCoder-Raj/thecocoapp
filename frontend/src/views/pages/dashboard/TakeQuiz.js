import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",

    "@media(max-width:1000px)": {},
    "@media(max-width:767px)": {},
  },
  gridBox: {
    display: "grid",
    gap: "16px",
  },
  logoBox: {
    height: "-webkit-fill-available",
    alignItems: "end",
    display: "grid",
    justifyContent: "start",
  },
  CombineBox: {
    display: "grid",
    paddingBottom: "20px",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 200px)",
  },
  buttonHandle: {
    
    position:"fixed",
    width:"-webkit-fill-available",
    bottom:"0"
  },
};
const MainBox = styled(Box)(({ theme }) => ({
  padding: "60px 0px 0 0px",
  height: "100vh",
  overflow: "auto",
  alignItems: "end",
  justifyContent: "space-between",
  alignContent: "space-between",
}));
const InnerBox = styled(Box)(({ theme }) => ({
  padding: "45px",
  borderTop: "2px solid #D8D8D8",
  "@media(max-width:100px)": {
    padding: "30px",
    borderTop: "2px solid #D8D8D8",
},
  "@media(max-width:767px)": { padding: "20px", border:"none" },
  background:"#fff"
}));

const TakeImg = styled("img")(({ theme }) => ({
  maxWidth: "330px",
  "@media(max-width:767px)": {width:"100%"},
}));
function TakeQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <MainBox>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={style.CombineBox}>
              <TakeImg src="images/Answer3Q.png" alt="" />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <InnerBox sx={style.buttonHandle}>
        <Container>
          <Grid  spacing={4}>
            <Grid item xs={12}>
              <Box >
                <Box sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "8px",
}}>
 <Button variant="contained" onClick={()=>{
                  navigate("/questions", {
                    state: {
                      module_id: location?.state?.level_id,
                      level_id: location?.state?.module_id,
                    },
                  });
                }}
                sx={{
                  width:{
                    md:"155px",
                    sm: "-webkit-fill-available",
                    xs:"-webkit-fill-available"
                  }
                }}
                >Take Quiz</Button>
                </Box>
               
              </Box>
            </Grid>
          </Grid>
        </Container>
      </InnerBox>
    </MainBox>
  );
}

export default TakeQuiz;
