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
        maxWidth: "400px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "35px",
        borderRadius: "20px",
        "@media(max-width:500px)": {
            maxWidth: "300px",
        },
    },

};
const MainBox = styled(Box)(({ theme }) => ({
    // padding: "60px 0px 0 0px",
    overflow: "auto",
    display: "grid",
    '-webkit-align-items': "end",
    '-webkit-box-align': "end",
    width: "100%",
    '-ms-flex-align': "end",
    '-ms-flex-line-pack': "space-between",
    alignContent: "space-around",
}));
const InnerBox = styled(Box)(({ theme }) => ({
    padding: "45px",
    borderTop: "2px solid #D8D8D8",
    "@media(max-width:767px)": { padding: "30px" },
    background: "rgba(255, 253, 243, 1)"
}));

const TakeImg = styled("img")(({ theme }) => ({
    maxWidth: "480px",
    "@media(max-width:500px)": {
        maxWidth: "380px",
    },
    "@media(max-width:450px)": {
        maxWidth: "330px",
    },
}));
function Complete() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <MainBox>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={style.CombineBox}>
                            <Box>
                                <Box sx={{ position: "relative", zIndex: "1" }}>
                                    <TakeImg src="images/starback.png" alt="" />
                                    <Box sx={{
                                        position: "absolute", bottom: "47px", left: "50%",
                                        textAlign: "center",
                                        transform: "translateX(-50%)",
                                        minHeight: "80px",
                                        display: "grid",
                                        "@media(max-width:500px)": {
                                            bottom: "20px",
                                        },
                                    }}>
                                        <Typography color={"rgba(255, 255, 255, 1)"} variant="h4">{location?.state?.levelNo || "--"}</Typography>
                                        <Typography variant="h1" color={"rgba(255, 255, 255, 1)"}>COMPLETE</Typography>
                                    </Box>
                                </Box>
                                <Box sx={style.boxInner}>
                                    <Box sx={{
                                        display: "grid", minHeight: "200px", padding: "30px 0", gap: "45px",
                                        "@media(max-width:500px)": {
                                            gap: "20px",
                                        },
                                    }}>
                                        <Box>
                                            <Typography variant="h3" color={"rgba(20, 23, 25, 1)"} fontWeight={"600"}>Good job, {localStorage.getItem("childName") || "--"}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h4" color={"rgba(254, 141, 67, 1)"} fontWeight={"800"}>Reward</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "center" }}>
                                                <img src="images/Coin.png" alt=""
                                                    style={{ width: "32px", height: "32px" }} /><Typography color={"rgba(254, 141, 67, 1)"} variant="h1">{location?.state?.totalPoints || "--"}</Typography>
                                            </Box></Box>
                                        <Box>
                                            <Button onClick={() => { navigate("/dashboard") }} variant="contained">Yay, OK!</Button>
                                        </Box></Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <InnerBox>
                <Container>
                    <Grid spacing={4}>
                        <Grid item xs={12}>
                            <Box sx={style.buttonHandle}>

                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </InnerBox>
        </MainBox>
    );
}

export default Complete;
