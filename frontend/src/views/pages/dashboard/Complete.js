import React from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    styled,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

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
        height:"calc(100vh - 120px)"
    },
    buttonHandle: {
        display: "flex",
        justifyContent: "end",
        gap: "8px",
    },
    boxInner: {
        backgroundImage: "url('/images/rewardBack.png')", backgroundSize: "cover",
        textAlign: "center",
        position: "relative",
        top: "-40px",
        maxWidth: "321px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "35px",
        borderRadius: "20px",
        "@media(max-width:600px)": {
            maxWidth: "235px",
            padding: "10px 15px",
        },
    },

};
const MainBox = styled(Box)(({ theme }) => ({
    // padding: "60px 0px 0 0px",
    overflow: "auto",
    // display: "grid",
    // '-webkit-align-items': "end",
    // '-webkit-box-align': "end",
    // width: "100%",
    // '-ms-flex-align': "end",
    // '-ms-flex-line-pack': "space-between",
    // alignContent: "space-around",
}));
const InnerBox = styled(Box)(({ theme }) => ({
    padding: "45px",
    borderTop: "1px solid #E5E5E5",
    "@media(max-width:767px)": { padding: "30px" },
    background: "rgba(255, 253, 243, 1)"
}));

const TakeImg = styled("img")(({ theme }) => ({
    maxWidth: "409px",
    "@media(max-width:600px)": {
        maxWidth: "310px",
    },
    "@media(max-width:450px)": {
        maxWidth: "290px",
    },
}));
const TaddyImg = styled("img")(({ theme }) => ({
    width: "160px",
    "@media(max-width:650px)": {
     width: "150px"
    },
    "@media(max-width:500px)": {
        width: "140px"
    },
}));
function Complete() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <MainBox style={{position:"relative", height:"100vh"}}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={style.CombineBox}>
                            <Box>
                                <Box sx={{ position: "relative", zIndex: "1" }}>
                                    <TakeImg src={isMobile ? "images/starback1.png" :"images/starback.png"} alt="" />
                                    <Box sx={{
                                        position: "absolute", bottom: "47px", left: "50%",
                                        textAlign: "center",
                                        transform: "translateX(-50%)",
                                        minHeight: "80px",
                                        display: "grid",
                                        "@media(max-width:600px)": {
                                            bottom: "18px",
                                        },
                                    }}>
                                        <Typography color={"rgba(255, 255, 255, 1)"} variant="h4">{location?.state?.levelNo || " "}</Typography>
                                        <Typography variant="h1" color={"rgba(255, 255, 255, 1)"}>COMPLETE</Typography>
                                    </Box>
                                </Box>
                                <Box sx={style.boxInner}>
                                    <Box sx={{
                                        display: "grid", minHeight: "200px", padding: "30px 0", gap: "25px",
                                        "@media(max-width:500px)": {
                                            gap: "20px",
                                        },
                                    }}>
                                        <Box>
                                            <Typography variant="h3" color={"rgba(45, 43, 41, 1)"} fontWeight={"600"}>Good job, {localStorage.getItem("childName") || " "}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h4" color={"rgba(254, 141, 67, 1)"} fontWeight={"800"}>Reward</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "center" }}>
                                                <img src="images/Coin.png" alt=""
                                                    style={{ width: "32px", height: "32px" }} /><Typography color={"rgba(254, 141, 67, 1)"} variant="h1">{location?.state?.totalPoints || " "}</Typography>
                                            </Box></Box>
                                        <Box>
                                            <Button fullWidth onClick={() => { navigate("/dashboard") }} variant="contained">Yay, OK!</Button>
                                        </Box></Box>
                                </Box>
                            </Box>
                           
                        </Box>
                     
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{position:"fixed", bottom:"0", width:"100%"}}>
                <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                        <Box onClick={() => { navigate("/dashboard") }} sx={{
                            position:"relative",
                            left: "50px",
                            display:"flex",
                }}>
                        <TaddyImg alt="" src="images/Coco-Idle_Without_Talking.gif"  />
                            <img alt="" src="images/coinStar.png" style={{
                                position: "relative",
                                left: "-100px",
                                maxWidth:"180px"
}}/>
                        
                        </Box>
            </Box></Container>
            <InnerBox>
               
                <Container>
                    <Grid spacing={4}>
                        <Grid item xs={12}>
                            <Box sx={style.buttonHandle}>

                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </InnerBox></Box>
        </MainBox>
    );
}

export default Complete;
