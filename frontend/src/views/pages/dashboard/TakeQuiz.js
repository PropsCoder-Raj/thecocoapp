import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

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
  padding: "30px 0px 0 0px",
  height: "100vh",
  overflow: "auto",
  alignItems: "end",
  justifyContent: "space-between",
  alignContent: "space-between",
}));
const InnerBox = styled(Box)(({ theme }) => ({
  padding: "45px",
  borderTop: "1px solid #E5E5E5",
  "@media(max-width:100px)": {
    padding: "30px",
    borderTop: "1px solid #E5E5E5",
},
  "@media(max-width:767px)": { padding: "20px", border:"none" },
  background:"#fff"
}));

const TakeImg = styled("img")(({ theme }) => ({
  maxWidth: "200px",
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
            <Box sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              cursor: "pointer"
            }} onClick={() => { navigate("/dashboard") }}>
              <IoMdArrowBack />
              <Typography>Back</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={style.CombineBox}>
              <Box sx={{position:"relative",
                display: "grid",
    justifyContent: "center",
    alignItems: "center",
    width: "354px",
              }}>
              <TakeImg src="images/Coco-Idle_Without_Talking.gif" alt="" />
              <Box sx={{ borderRadius: "8px", border:"1px solid #D8D8D8", padding:"25px", width:"354px", position:"absolute", bottom:{
                md:"-90px",
                sm:"-90px",
                xs:"-50px"
              }, background:"#fff"}}>
                <Typography variant="h4">Answer 3 questions and know do you remember what you read!</Typography>
              </Box></Box>
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
