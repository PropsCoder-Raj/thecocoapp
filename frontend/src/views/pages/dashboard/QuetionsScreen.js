import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, LinearProgress, Snackbar, styled, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { generateLabels } from "src/utils";
import { IoMdClose } from "react-icons/io";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "@emotion/react";

const style = {
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
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
    padding: "20px 0",
    gap: "25px",
    maxWidth: "700px",
  },
  buttonHandle: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    alignItems: "center",
    "@media(max-width:767px)": { 
      display:"block",
    }
  },
  manageBBHeight:{
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 368px)",
    display: "grid",
    overflow: "auto",
    "@media(max-width:767px)": {
      height: "calc(100vh - 300px)",
      justifyContent: "start",
      alignItems: "start",
      display: "block"
    },
  },

  displaycustom:{
    display:"block",
    "@media(max-width:767px)": {
      display: "none",
    }
  },
  displaycustom1:{
    display: "none",
    "@media(max-width:767px)": {
      display: "flex",
      gap: "8px",
      alignItems:"center"
    }
  }
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
    borderTop: "1px solid #E5E5E5",
    position: "fixed",
    bottom: "0",
    width: "-webkit-fill-available",
  "@media(max-width:767px)": { padding: "15px" },
  "@media(max-width:1000px)": { padding: "25px" },
}));
const TakeImg = styled("img")(({ theme }) => ({
  width: "80px",
  height:"80px",
  "@media(max-width:767px)": {
    width: "30px",
    height: "30px", },
 
}));
const TakeImg1 = styled("img")(({ theme }) => ({
  width: "80px",
  height: "80px",
  "@media(max-width:767px)": {
    width: "30px",
    height: "30px",
  },
  "@media(max-width:1000px)": {
    width: "30px",
    height: "30px",
  },}));
const CustomLinearProgress = styled(LinearProgress)(({ progressColor }) => ({
  width: "-webkit-fill-available",
  height: "10px",
  backgroundColor: "rgba(216, 216, 218, 1)",
  borderRadius: "4px",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#FE8A36",
    borderRadius: "4px",
  },
}));
const EffectImg = styled("img")(({ theme }) => ({
  width: "200px",
  "@media(max-width:767px)": {
 width:"120px"
  },
}))
function QuetionsScreen() {
  const navigate = useNavigate();
    let min = 1;
    const [progress, setProgress] = useState(1);
    const nextProgress = () => {
      setProgress(correctAnsData.nextQuestionNo); // Increment or reset to minimum
      setCorrectAns(null);
    };
  const[activeindex, setActiveIndex] =useState("");
  const [correctAns, setCorrectAns] = useState(null);
  console.log(correctAns, "correctAns");
  const handleClose = (event, reason) => {

    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [percentage, setPercentage] = useState(1);
  const [susscessQuestions, setSusscessQuestions] = useState(1);
  const [correctAnsData, setCorrectAnsData] = useState({});
  const location = useLocation();
  const [quetionsData, setQuetionsData] = useState([]);
  const calculateProgressValue = () => (((progress - min) / (max - min)) * 100) || 1;
  const labels = generateLabels(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(quetionsData, "quetionsData");
  const [max, setMax] = useState(quetionsData.length);
  useEffect(() => {
    getQuetionsData();
  }, [])
  const getQuetionsData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getQuestions}/${location?.state?.level_id}/${location?.state?.module_id}`,
        headers: { token: token },
        // params:{
        //   level_id: location?.state?.level_id,
        //   module_id: location?.state?.module_id
        // }
      });
      if (res.status === 200) {
        setQuetionsData(res.data.result.quesitons)
        setMax(res.data.result.quesitons.length)
        setAttempt(res.data.result.attamptedQuestions)
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const AnsQuetion = async (props) => {
    const { question_id, answer }=props
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "POST",
        url: `${ApiConfig.attemptQuestions}`,
        headers: { token: token },
        data:{
          "question_no": progress,
          "question_id": question_id,
          "module_id": location?.state?.module_id,
          "level_id": location?.state?.level_id,
          "answer": answer,
          "demo": attempt
        }
      });
      if (res.status === 200) {
        setCorrectAns(res.data.result.correctAnswerStatus);
        setCorrectAnsData(res.data.result)
        //res.data.result.loaderPercentage
        setPercentage(res.data.result.loaderPercentage)
        setSusscessQuestions(res.data.result.susscessQuestions)
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <MainBox>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ alignItems: "center", display: "grid" }}>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <IoMdClose
                color="#FE8A36"
                onClick={() => {
                  navigate("/dashboard");
                }}
                cursor={"pointer"}
              />
              <CustomLinearProgress
                variant="determinate"
                value={percentage}
                // value={attempt ? percentage : calculateProgressValue()}
              />
              <Typography variant="body2" color={"#FE8A36"}>
                {percentage > 1 ? susscessQuestions : 1}/{max}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={correctAns == "" ? style.manageBoxHeight : style.manageBBHeight}>
              <Box sx={style.CombineBox}>
                <Box sx={{ marginBottom: "20px" }}>
                  <Typography variant="h3" fontWeight={600}>
                    {quetionsData[progress - 1]?.name || "--"}
                  </Typography>
                </Box>

                {quetionsData[progress - 1]?.options.map((values, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      padding: "12px",
                      borderRadius: "8px",
                      border: activeindex === index ? "1px solid rgba(0, 186, 242, 1)" :"1px solid #D8D8D8",
                      cursor: "pointer",
                      background: activeindex === index ? "#E6F8FE" : "#fff",
                      "&:hover":{
                        background:"#E6F8FE"
                      }
                    }}
                    onClick={() => {
                      setActiveIndex(index);
                      AnsQuetion({ question_id: quetionsData[progress - 1]?._id, answer: labels[index] })
                     
                    }}
                  >
                    <Typography variant="h4">{labels[index]}.</Typography>
                    <Typography variant="h4">{values.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {correctAns === true && 
        <Container sx={isMobile ? { marginTop:"-7px"} :{}}>
        <Box sx={{
          display: "flex",
          justifyContent: "end"
        }}>
            <EffectImg alt="" src="images/Coco-Idle_Talking-crop.gif" />
        </Box></Container>}
      <InnerBox
        sx={
          correctAns === true
            ? { background: "#D7FFB8", marginTop: "55px", border: "none", padding: {
              md: "29px",
              sm: "29px",
              xs:"15px"
            }, height:"128px" }
            : correctAns === false
            ? { background: "#FFCFCF", marginTop: "65px", border:"none" }
            : { background: "#ffff" }
        }
      >
        <Container>
          <Grid spacing={4}>
            <Grid item xs={12}>
              <Box sx={style.buttonHandle}>
                {correctAns === true ? (
                  <Box
                    sx={{
                      display: "flex", gap: "8px", alignItems: "center", "@media(max-width:767px)": {
                        marginBottom: "15px"
                      } }}
                  >
                    <TakeImg src="images/correct.png" alt="" />
                    <Typography variant="h4" color={"#58CC02"}>
                      Great Job
                    </Typography>
                  </Box>
                ) : correctAns === false ? (
                  <Box
                    sx={{ display: "flex", gap: "8px", alignItems: "center" }}
                  >
                    <Box sx={style.displaycustom}>
                    <TakeImg src="images/wrong.png" alt="" /></Box>
                    <Box>
                      <Box sx={{display:"flex", gap:"8px", alignItems:"center"}}>
                          <Box sx={style.displaycustom1}>
                            <TakeImg1 src="images/wrong.png" alt="" /></Box>
                      <Typography
                        variant="h4"
                        color={"#FF4B4B"}
                        fontWeight={600}
                      >
                        Try next time
                      </Typography></Box>
                      <Typography
                        variant="h4"
                        color={"#FF4B4B"}
                        marginBottom={"8px"}
                        marginTop={"12px"}
                      >
                          Correct Answer: {correctAnsData.right_answer || "--"}
                      </Typography>
                      <Typography variant="h4" color={"#FF4B4B"}>
                          {correctAnsData.desc || "--"}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box></Box>
                )}

                <Button
                  disabled={correctAns == null }
                 sx={{
                  width:{
                    md:"155px",
                    sm: "-webkit-fill-available",
                    xs:"-webkit-fill-available"
                  },
                   marginTop: {
                      md: "0",
                      sm: "10px",
                      xs: "10px"
                    }
                }}
                  style={
                    correctAns === true
                      ? { background: "#58CC02" }
                      : correctAns === false
                      ? { background: "#FF4B4B" }
                        : { background: "#FE8A36", color:"rgb(188 102 40)" }
                  }
                  variant="contained"
                  onClick={() => { 
                    setCorrectAns(null);
                  
                    setActiveIndex("");  
                    if (correctAnsData.nextScreen === "SCORE_BOARD"){
                      navigate("/complete",
                        {state:{
                          totalPoints: correctAnsData.totalPoints,
                          levelNo: correctAnsData.levelNo 
                        }}
                      )
                    }else{
                      nextProgress();
                    }
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </InnerBox>
      <Snackbar
        ContentProps={{
          sx: {
            background: "rgba(20, 23, 25, 1)",
          },
        }}
        sx={{ width: "-webkit-fill-available !important", marginBottom:"140px" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Select an option before checking !"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      // action={action}
      />
    </MainBox>
  );
}

export default QuetionsScreen;
