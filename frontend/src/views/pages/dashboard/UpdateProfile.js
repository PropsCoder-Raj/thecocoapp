import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { LiaUserCircleSolid } from "react-icons/lia";
import { UserContext } from "src/context/User";

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
        padding: "40px"
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
};
const MainBox = styled(Box)(({ theme }) => ({
    padding: "15px 0px 0 0px",
    overflow: "auto",
    alignItems: "end",
    justifyContent: "space-between",
    alignContent: "space-between",
}));
const InnerBox = styled(Box)(({ theme }) => ({
    padding: "45px",
    borderTop: "2px solid #D8D8D8",
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
function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const User = useContext(UserContext);
    const [childData, setChildData] = useState([]);

    const [profilePic, setProfilePic] = useState("");
    useEffect(() => {
        setProfilePic(User?.profile?.profilePic)
    }, [User.profile])
    const [profileData, setProfileData] = useState("");
    const [name, setName] = useState("");
    useEffect(() => { setName(User?.profile?.name || "") }, [User.profile])
    console.log(childData, "childData");
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
                        disabled
                        inputProps={{ maxLength: 256 }}
                        value={User?.profile?.email}
                        name="name"
                        onChange={() => { }}
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
                        onChange={(e) => { setName(e.target.value);

                            UpdateProfile({ name: e.target.value })
                         }}
                        style={{ marginTop: "5px" }}
                    />
                </Box>

                {
                    childData.length != 0 &&
                childData.map((values, items) => {
                    return (
                        <Box sx={style.profileBox}>
                            <Box
                                style={{ background: "rgba(255, 255, 255, 1)" }}
                                sx={style.userBox}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                                    onClick={() => {
                                        navigate("/child-profile", {
                                            state: {
                                                name: values.childName,
                                                img: values.profilePic ? values.profilePic :
                                                    values.gender == "Male" ? "images/boyprofile.jpg" : "images/girlprofile.jpg",
                                                childId: values._id,
                                                data:values
                                            }
                                        })
                                    }}
                                >
                                    <ProfileImg alt="" src={
                                        values.profilePic ? values.profilePic :
                                            values.gender == "Male" ? "images/boyprofile.jpg" : "images/girlprofile.jpg"} />
                                    <Box > <Typography variant="body1">{values.childName}</Typography>
                                        <Box sx={style.GapBox}>
                                            {/* <Typography variant="body1">{values.totalPoints}</Typography>
                                            <CoinImg alt="" src="images/Coin.png" /> */}
                                        </Box></Box></Box>
                            </Box>
                        </Box>)
                })}{childData.length < 3 &&
                        <Box sx={style.profileBox} style={{cursor:"pointer"}}>
                            <Box
                                style={{ background: "rgba(255, 255, 255, 1)" }}
                                sx={style.userBox}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={()=>{
                                   navigate("/child-profile",{
                                    state:{
                                        name:"Add",
                                        img:"",
                                        childId:"",
                                        data:""
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
    );
}

export default UpdateProfile;
