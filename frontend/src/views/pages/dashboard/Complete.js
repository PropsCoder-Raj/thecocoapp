import React, { useEffect, useState } from "react";
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
import useSound from "use-sound";
import AdSense from "src/component/AdSense";
import { IoMdClose } from "react-icons/io";

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
        height:"calc(100vh - 190px)"
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
    borderTop: "1px solid #E5E5E5",
    display:"flex",
    justifyContent:"center"
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
    const [closeAdd, setCloseAdd] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [winner, { stop, play }] = useSound('images/winners_W9Cpenj.mp3', { preload: true });
    // useEffect(()=>{
    //     winner()  
       
    // }, [])
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
                {!isMobile &&
            <InnerBox>
                    <AdSense height="90px" />
               
            </InnerBox>}</Box>
            {isMobile && closeAdd &&
                <Box sx={{ position: "fixed", top: "0", width: "100%", height: "100vh", zIndex: "1", background: "rgb(255, 255, 255, 0.75)" }}>
                    <Box sx={{ padding: "20px", display: "flex", justifyContent: "end" }}>
                        <IoMdClose
                            color="#000"
                            onClick={() => {
                                setCloseAdd(false);
                                winner()
                            }}
                            cursor={"pointer"}
                            size={"30px"}
                        />
                    </Box>
                    <AdSense className="adsence-block" />
                </Box>
            }
        </MainBox>
    );
}

export default Complete;
