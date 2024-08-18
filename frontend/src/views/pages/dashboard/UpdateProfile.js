import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    styled,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { LiaUserCircleSolid } from "react-icons/lia";
import { UserContext } from "src/context/User";
import TopBar from "src/layouts/DashboardLayout/TopBar";
import { IoMdArrowBack } from "react-icons/io";


const style = {
    flexBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItem: "center",

        "@media(max-width:1000px)": {},
        "@media(max-width:767px)": {},
    },
    editBox: {
        position: "relative",
        bottom: "0",
        right: "30%"
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
        paddingBottom: "20px",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid rgba(229, 229, 229, 1)",
        margin: "auto",
        maxWidth: "550px",
        borderRadius: "10px",
        padding: "40px",
        "@media(max-width:600px)": {
            border: "none",
            padding: "8px"
        },
    },
    buttonHandle: {
        display: "flex",
        justifyContent: "end",
        gap: "8px",
    },
    profileBox: {
        display: "flex",
        gap: "8px",
        padding: "10px",
        margin: "15px 0",
        border: "1px solid rgba(229, 229, 229, 1)",
        borderRadius: "8px",
        cursor:"pointer"
    },
    mainScreenBack: {
        overflow: "auto", 
        height: "100vh"
    },
    content: {
        minHeight: "500px",
        borderRadius: "10px",
        minWidth: "430px",
        padding: "28px",
        color: "#1A1919",
        margin: "50px 0 auto 50px",
        background: "#FFF",
        border: "1px solid rgba(229, 229, 229, 1)",
        "@media(max-width:600px)": {
            padding: "0 0px",
        },
        "@media(max-width:900px)": {
            margin: "0px 10px",
            border: "none",
            padding: "0 0px",
            minWidth: "auto"
        },
    },
    logo: {
        cursor: "pointer",
        maxWidth: "155px",
    },
    boxMnage: {
        margin: "0px 50px 50px 0px",
        position: "sticky",
        top: "50px",
        height: "fit-content",
        "@media(max-width:900px)": {
            display: "none",
        },
    },
    mainBox: {
        display: "flex",
        paddingTop: "130px",
        alignItems:"flex-start",
        "@media(max-width:900px)": {
            display: "grid",
            alignItems: "baseline",
            paddingTop: "60px",
        },
    },
};

const ImageGroup = styled("img")({
    width: "100%",
});
const ImageLayOut = styled("img")({
    width: "100%",
    maxWidth: "170px",
    marginTop: "-30px",
    display: "none",
    "@media(max-width:900px)": {
        display: "block",
    },
});
const ManageLayout = styled(Box)({
    background: "rgb(255 253 243)",
    minHeight: "500px",
    border: "1px solid #E5E5E5",
    borderRadius: "10px",
});
const MainBox = styled(Box)(({ theme }) => ({
    padding: "0px 0px 0 0px",
    overflow: "auto",
    alignItems: "end",
    justifyContent: "space-between",
    alignContent: "space-between",
    minWidth: "480px",
    "@media(max-width:600px)": {
        minWidth: "auto",
    },
}));
const InnerBox = styled(Box)(({ theme }) => ({
    padding: "45px",
    borderTop: "1px solid #E5E5E5",
    "@media(max-width:767px)": { padding: "30px" },
}));

const TakeImg = styled("img")(({ theme }) => ({
    maxWidth: "330px",
    "@media(max-width:767px)": { width: "100%" },
}));
const ProfileImg = styled("img")(({ theme }) => ({
    width: "70px",
    height: "70px",
    margin: "0 12px"
}));
const Root = styled("div")(({ theme }) => ({
    flexGrow: 1,
    display: "block",
    position: "fixed",
    width: "-webkit-fill-available",
    zIndex: "1",
    backgroundColor: "#fff",
    boxShadow: "none",
    border: "1px solid #E5E5E5",
    borderRadius: "0",
    padding: "12px 5px",
    "@media(max-width:767px)": { border:"none" },
}));
function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const normalizeString = (str) => str ? str.trim().toLowerCase() : '';
    const User = useContext(UserContext);
    const [childData, setChildData] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [profilePic, setProfilePic] = useState("");
    useEffect(() => {
        setProfilePic(User?.profile?.profilePic)
    }, [User.profile])
    const [profileData, setProfileData] = useState("");
    const [name, setName] = useState("");
    useEffect(() => { setName(User?.profile?.name || "") }, [User.profile])
    useEffect(() => {
        getChildData();
    }, [])

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
            }
        } catch (error) {
            console.log(error, "error");
        }
    };

    const handleImageSelect = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            setProfileData(file);
            UploadImg(file)
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileData(profilePic);
        }
    };

    const UploadImg = async (value) => {
        const token = localStorage.getItem("token")
        try {
            const formData = new FormData();
            formData.append("image", value);
            const res = await axios({
                method: "POST",
                url: ApiConfig.photo,
                headers: { token: token },
                data:formData
            });
            if (res.status === 200) {
                setProfilePic(res.data.result);
                UpdateProfile({ profilePic: res.data.result })
            }
        } catch (error) {
            console.log(error, "error");
        }
    };

    const UpdateProfile = async (value) => {
        const token = localStorage.getItem("token")
        try {
            const formData = new FormData();
            formData.append("image", value);
            const res = await axios({
                method: "PUT",
                url: ApiConfig.getUpdateProfile,
                headers: { token: token },
                data: value
            });
            if (res.status === 200) {
                setProfilePic(res.data.result);
                User.getViewMyProfile();
            }
        } catch (error) {
            console.log(error, "error");
        }
    };
    return (
            <Box sx={style.mainScreenBack} >
            <Root>
                <Container>
            <Box sx={style.flexBox} onClick={() => { navigate("/dashboard")}}>
                        <Box sx={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            cursor: "pointer"
}}>
                            <IoMdArrowBack style={isMobile ? { color:"#FE8A36", fontSize:"25px"}:{color:"#000"}} />
                            {!isMobile && <Typography>Back</Typography>} </Box>
            </Box></Container></Root>
      <Container >
        <Box sx={style.mainBox}>
          <Box sx={style.boxMnage}>
            <ManageLayout>
              <ImageGroup alt="" src="images/loginBack.png" style={{borderRadius:"10px"}} />
            </ManageLayout>
          </Box >
        
                        <MainBox>
                            <Box sx={style.CombineBox}>
                                <div
                                    style={{
                                        display: "grid",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBottom: "10px",
                                            position: "relative"
                                        }}
                                    >
                                        <img
                                            src={
                                                profilePic
                                                    ? profilePic
                                                    : "images/defaultPic.png"
                                            }
                                            alt=""
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                        <div style={{
                                            position: "absolute", bottom: "-10px",
                                            right: "35px",
                                        }}>
                                            <Box sx={style.editBox}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple="false"
                                                    style={{
                                                        position: "absolute",
                                                        zIndex: "1",
                                                        width: "-webkit-fill-available",
                                                        overflow: "hidden",
                                                        height: "100%",
                                                        opacity: "0",
                                                    }}
                                                    onChange={(e) => handleImageSelect(e)}
                                                />
                                                <img src="images/editProfile.svg" style={{ width: "35px", height: "35px", cursor: "pointer" }} />
                                            </Box>
                                        </div>
                                    </div>

                                    <Typography >
                                        Change Profile Photo
                                    </Typography>

                                </div>
                                <Box>
                                    <TextField
                                        placeholder="Your Full email"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        inputProps={{ maxLength: 256, readOnly: true }}
                                        value={User?.profile?.email}
                                        name="name"
                                        style={{ margin: "15px 0" }}
                                    />
                                    <TextField
                                        placeholder="Your Full name"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        inputProps={{ maxLength: 256 }}
                                        value={name}
                                        name="name"
                                        onChange={(e) => {
                                            setName(e.target.value);

                                            UpdateProfile({ name: e.target.value })
                                        }}
                                        style={{ marginTop: "5px" }}
                                    />
                                </Box>

                                {
                                    childData.length != 0 &&
                                    childData.map((values, items) => {
                                        const normalizedGender = normalizeString(values.gender);
                                        let defaultPic = normalizedGender === "male"
                                            ? "images/boyprofile.png"
                                            : "images/girlprofile.png";

                                        let profilePicture = values.profilePic && values.profilePic !== "images/boyprofile.png" && values.profilePic !== "images/girlprofile.png"
                                            ? values.profilePic
                                            : defaultPic;

                                        return (
                                            <Box 
                                                style={values.activeStatus ? {
                                                    background: "rgba(241, 245, 249, 1)", cursor: "pointer"
                                                } : { background: "rgba(255, 255, 255, 1)", cursor: "pointer" }}
                                            sx={style.profileBox}>
                                                <Box
                                                    
                                                    
                                                    sx={style.userBox}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                                                        onClick={() => {
                                                            navigate("/child-profile", {
                                                                state: {
                                                                    name: values.childName,
                                                                    img: profilePicture,
                                                                    childId: values._id,
                                                                    data: values
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <ProfileImg alt="" src={profilePicture} />
                                                        <Box > <Typography variant="body1">{values.childName}</Typography>
                                                            <Box sx={style.GapBox}>
                                                                {/* <Typography variant="body1">{values.totalPoints}</Typography>
                                            <CoinImg alt="" src="images/Coin.png" /> */}
                                                            </Box></Box></Box>
                                                </Box>
                                            </Box>)
                                    })}{childData.length < 3 &&
                                        <Box sx={style.profileBox} style={{ cursor: "pointer" }}>
                                            <Box
                                                style={{ background: "rgba(255, 255, 255, 1)" }}
                                                sx={style.userBox}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => {
                                                    navigate("/child-profile", {
                                                        state: {
                                                            name: "Add",
                                                            img: "",
                                                            childId: "",
                                                            data: ""
                                                        }
                                                    })
                                                }}>
                                                    <LiaUserCircleSolid
                                                        style={{ color: "#D8D8D8", fontSize: "25px" }}
                                                    />
                                                    <Typography variant="body2">Add child</Typography>
                                                    <Box >
                                                        <Box sx={style.GapBox}>
                                                            {/* <Typography variant="body1">{values.totalPoints}</Typography>
                                            <CoinImg alt="" src="images/Coin.png" /> */}
                                                        </Box></Box></Box>
                                            </Box>
                                        </Box>
                                }
                            </Box>
                        </MainBox>
          
        </Box>
      </Container>
    </Box>
        
    );
}

export default UpdateProfile;
