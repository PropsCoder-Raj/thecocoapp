import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import toast from "react-hot-toast";

const style = {
  HandleMargin: {
    marginTop: "20px",
    marginBottom: "80px",
    minWidth: "260px",
    "@media(max-width:1000px)": {
      marginBottom: "60px",
    },
    "@media(max-width:767px)": {
      marginTop: "15px",
      marginBottom: "30px",
    },
  },
  BoxStyle: {
    padding: "34px",
    border: "2px solid rgba(216, 216, 216, 1)",
    borderRadius: "16px",
  },
  GapBox: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    justifyContent:"start"
  },
  GridBox: {
    display: "grid",
    gap: "25px",
  },
  profileBox: {
    display: "flex",
    gap: "8px",
  },
  userBox: {
    width: "-webkit-fill-available",
    display: "grid",
    justifyContent: "start",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "15px",
    border: "1px solid rgba(224, 220, 220, 1)",
  },
  levelMargin: {
    marginTop: "60px",
    "@media(max-width:767px)": {
      marginTop: "40px",
    },
  },
  GridManrgin: {
    padding: "20px 40px !important",
    position: "relative",
  },
  customBorder: {
    padding: "6px",
    borderRadius: "10px",
    border: "2px solid #00BAF2",
    width: "105px",
    height: "51px",
    position: "absolute",
    top: "-16px",
    background: "#fff",
    textAlign: "center",
    cursor:"pointer"
  },
  textCss: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#00BAF2",
  },
};

// const TitleWrapper = styled('img')(({ theme }) => ({
// }));

const StyledImg = styled("img")(({ theme }) => ({
  width: "124px",
  height: "auto",
  marginTop:"-47px"
}));
const TaddyImg = styled("img")(({ theme }) => ({
  width: "115px",
  height: "auto",
}));
const ProfileImg = styled("img")(({ theme }) => ({
  width: "70px",
  height: "70px",
  margin:"0 12px"
}));
const CoinImg = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
}));
const AddImg = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
  "@media(max-width:900px)": {
    maxHeight: "250px",
  },
}));
const LockImg = styled("img")(({ theme }) => ({
  width: "120px",
  height: "120px",
}));
function Dashboard() {
  const navigate = useNavigate();
  const [childData, setChildData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const levels = [
    {
      _id: "6679a728f2eac92152686fb5",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 1,
      name: "What is Money?",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: true,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fb6",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 2,
      name: "History of Money",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: true,
    },
    {
      _id: "6679a728f2eac92152686fb7",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 3,
      name: "Different Types of Money",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fb8",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 4,
      name: "The Value of Money",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fb9",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 5,
      name: "How Money is Made",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
    {
      _id: "6679a728f2eac92152686fba",
      standard_id: "6679a728f2eac92152686fa5",
      module_id: "6679a728f2eac92152686fb0",
      level_id: 6,
      name: "Money Around the World",
      __v: 0,
      createdAt: "2024-06-24T17:04:40.371Z",
      updatedAt: "2024-06-24T17:04:40.371Z",
      complete_status: false,
      current_status: false,
    },
  ];

useEffect(()=>{
  getChildData();
},[])

  const getChildData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllChild,
        headers: { token: token },
      });
      if (res.status === 200) {
        setChildData(res.data.data);
        getAllModuleData();
      } 
    } catch (error) {
      console.log(error, "error");
    }
  };

  const renderBoxes = (levelValue) => {
    return levelValue.map((level, index) => {
      const isCenterBox = index % 3 === 0;
      const isSixItems = levelValue.length === 6;
      const isFirstBox = index === 0;
      let justifyContent = "center";

      if (index === 0 || (isSixItems && isCenterBox)) {
        justifyContent = "center";
      } else if (index % 3 === 2) {
        justifyContent = "flex-start";
      } else if (index % 3 === 1) {
        justifyContent = "flex-end";
      }

      return (
        <Grid
          item
          xs={isFirstBox || (isSixItems && isCenterBox) ? 12 : 6}
          key={level._id}
          container
          justifyContent={justifyContent}
          sx={style.GridManrgin}
        >
          {level.current_status && (
            <Box
              sx={style.customBorder}
              onClick={() => {
                navigate("/leason", {
                  state: {
                    module_id: level.module_id,
                    level_id: level._id,
                  },
                });
              }}
            >
              <Typography sx={style.textCss}>START</Typography>
            </Box>
          )}
          <LockImg
            onClick={() => {
              if (level.complete_status) {
                navigate("/leason", {
                  state: {
                    module_id: level.module_id,
                    level_id: level._id,
                  },
                });
              }
            }}
            src={
              level.current_status
                ? "images/play.png"
                : level.complete_status
                  ? "images/preview.png"
                  : "images/lock.png"
            }
            alt=""
            style={level.complete_status ? { cursor: "pointer" } : {}}
          />
        </Grid>
      );
    });
  };

  const switchChild = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.switchChild,
        headers: { token: token },
        params:{
          childId :id
        }
      });
      if (res.status === 200) {
        getChildData()
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getAllModuleData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.allModules,
        headers: { token: token },
      });
      if (res.status === 200) {
        setLevelData(res?.data?.result || [])
      }
    } catch (error) {
      console.log(error, "error");
      setLevelData([]);
      toast.error("Modules not found.");
    }
  };

  useEffect(()=>{
    
      childData.map((values, items) => {
        if (values.activeStatus){
          localStorage.setItem("childName", values.childName);
        }
      })
  }, [childData])
  return (
    <Page title="Dashboard">
      <Container maxWidth="lg">
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={7}>
              {levelData.map((values) => (
                <>
                  {values.modules.map((data) => (
                    <>
                      <Box
                        sx={{
                          background: "rgba(255, 245, 209, 1)",
                          borderRadius: "30px",
                          padding: "0 75px",
                          paddingBottom: "25px",
                          textAlign: "center",
                          marginTop: "47px",
                        }}
                      >
                        <Box>
                          <StyledImg alt="" src="images/Moduleimage.png" />
                        </Box>
                        <Box
                          sx={{
                            backgroundImage: "url('/images/moduleNameBack.png')",
                            padding: "6px",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="h4"
                            color={"#fff"}
                            sx={{ fontWeight: "600" }}
                          >
                            Module {data.module_id}
                          </Typography>
                        </Box>
                      </Box>
                      <Grid container spacing={3} sx={style.levelMargin}>
                        {renderBoxes(data.levels)}
                      </Grid>
                    </>
                  ))}
                </>
              ))}
            
            </Grid>
            <Grid item xs={5} sx={{ display: { xs: "none", sm: "block" } }}>
              <Box sx={style.GridBox}>
                <Box sx={style.BoxStyle}>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <TaddyImg alt="" src="images/TaddyIcon.png" />
                    <Box>
                      <Typography variant="h3" fontWeight={"700"} mb={1}>
                        Hello Dhruv!
                      </Typography>
                      <Typography variant="h4">
                        Happy learning! Complete one level daily to top !
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={style.BoxStyle}>
                  <Typography variant="h4">Switch Profile</Typography>
                  {childData.map((values, items)=>{
                    return(
                      <Box sx={style.profileBox} onClick={() => { switchChild(values._id)}}>
                      <Box
                          style={values.activeStatus ?{
                            background: "rgba(241, 245, 249, 1)",cursor:"pointer"
                          } : { background: "rgba(255, 255, 255, 1)", cursor: "pointer" }}
                        sx={style.userBox}
                      >
                        <Box sx={{display:"flex", alignItems:"center", gap:"10px"}}>
                          <ProfileImg alt="" src={
                              values.profilePic ? values.profilePic :
                            values.gender = "Male" ? "images/boyprofile.jpg" : "images/girlprofile.jpg"} />
                            <Box > <Typography variant="body1">{values.childName}</Typography>
                        <Box sx={style.GapBox}>
                            <Typography variant="body1">{values.totalPoints}</Typography>
                          <CoinImg alt="" src="images/Coin.png" />
                              </Box></Box></Box>
                      </Box>
                  </Box>)
                  })}
                 
                </Box>
                <Box sx={style.BoxStyle}>
                  <AddImg alt="" src="images/add.png" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default Dashboard;
