import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Form, Formik, FieldArray } from "formik";
import * as yup from "yup";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import styled from "@emotion/styled";

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
        borderRadius: "8px"
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
function ChildProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [childData, setChildData] = useState([]);
    const [profilePic, setProfilePic] = useState("");
    const [profileData, setProfileData] = useState(profilePic);
    const [isLoading, setIsLoading] = useState(false);
    const [schoolData, setSchoolData] = useState([]);
    const [schoolIds, setSchoolIds] = useState([]);
    const [selectedChild, setSelectedChild] = useState(1);
    useEffect(() => {
        setProfilePic(location?.state?.img)
    }, [location?.state?.img])

    const formInitialSchema = {
        children: [
            {
                name: "",
                schoolId: "",
                dob: "",
                gender: "",
                standard: "",
            },
        ],
    };

    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        let requestBody = values.children.map((child) => ({
            childName: child.name,
            schoolId: schoolData.find((ele) => ele.schoolId == child.schoolId)?._id,
            dob: child.dob,
            standard: child.standard,
            gender: child.gender,
            // profilePic: profileData ? profileData : null
        }));
        let RequestUrl = location?.state?.childId ? `${ApiConfig.updateChild}?childId=${location.state?.childId}` : ApiConfig.createChild
        let sendChildData = location?.state?.childId ? requestBody[0] : requestBody;
        try {
            let res = ""
            location?.state?.childId ?
             res = await axios.put(
                 RequestUrl, sendChildData,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
                ) : res = await axios.post(
                    RequestUrl, requestBody[0],
                    {
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    }
                );
            if (res.status === 200) {
                toast.success(res.data.message);
                setIsLoading(false);
                navigate("/update-profile");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            setIsLoading(false);
        } 

    };

    useEffect(() => {
        getSchool();
    }, []);

    const getSchool = async () => {
        try {
            let res = await axios.get(ApiConfig.getSchool);
            if (res.status === 200) {
                setSchoolData(res.data.data);
                setSchoolIds(res.data.data.map((ele) => ele?.schoolId));
            }
        } catch (error) {
            // console.error(error.response.data.message)
        }
    };

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
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileData(profilePic);
        }
    };
    return (
        <MainBox>
            <Box sx={{
                paddingBottom: "20px",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                maxWidth: "550px",
                borderRadius: "10px",
            }}>
                <Box sx={{ display: "flex", gap: "15px", alignItems: "center", cursor:"pointer" }} onClick={() => { navigate("/update-profile")}}>
                    <IoMdArrowBack color={"rgba(182, 183, 184, 1)"} />
                    <Typography >
                        {location?.state?.name || "--"} Profile
                    </Typography></Box></Box>

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
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={formInitialSchema}
                    validationSchema={yup.object().shape({
                        children: yup.array().of(
                            yup.object().shape({
                                name: yup.string().required("Please enter your full name."),
                                schoolId: yup.string(),
                                dob: yup.string(),
                                gender: yup.string(),
                                standard: yup.string(),
                            })
                        ),
                    })}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <FieldArray name="children">
                                {({ push, remove }) => (
                                    <>
                                        {values.children.map((child, index) => (
                                            <Grid key={index} sx={{ margin: "13px 0" }}>
                                               
                                                <Box sx={{ margin: "13px 0" }}>
                                                    <TextField
                                                        placeholder="Child's full name"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        inputProps={{ maxLength: 256 }}
                                                        value={child.name}
                                                        name={`children.${index}.name`}
                                                        error={Boolean(
                                                            touched.children?.[index]?.name &&
                                                            errors.children?.[index]?.name
                                                        )}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.children?.[index]?.name &&
                                                            errors.children?.[index]?.name
                                                        )}
                                                    >
                                                        {touched.children?.[index]?.name &&
                                                            errors.children?.[index]?.name}
                                                    </FormHelperText>
                                                </Box>
                                                <Box sx={{ margin: "13px 0" }}>
                                                    <TextField
                                                        placeholder="Enter School Id"
                                                        variant="outlined"
                                                        fullWidth
                                                        inputProps={{ maxLength: 256 }}
                                                        value={child.schoolId}
                                                        name={`children.${index}.schoolId`}
                                                        error={Boolean(
                                                            touched.children?.[index]?.schoolId &&
                                                            errors.children?.[index]?.schoolId
                                                        )}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.children?.[index]?.schoolId &&
                                                            errors.children?.[index]?.schoolId
                                                        )}
                                                    >
                                                        {touched.children?.[index]?.schoolId &&
                                                            errors.children?.[index]?.schoolId}
                                                    </FormHelperText>
                                                </Box>
                                                <Box sx={{ margin: "13px 0" }}>
                                                    <TextField
                                                        type="date"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        inputProps={{ maxLength: 256 }}
                                                        value={child.dob}
                                                        name={`children.${index}.dob`}
                                                        error={Boolean(
                                                            touched.children?.[index]?.dob &&
                                                            errors.children?.[index]?.dob
                                                        )}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.children?.[index]?.dob &&
                                                            errors.children?.[index]?.dob
                                                        )}
                                                    >
                                                        {touched.children?.[index]?.dob &&
                                                            errors.children?.[index]?.dob}
                                                    </FormHelperText>
                                                </Box>
                                                <Typography variant="h5" sx={{ textAlign: "start" }}>
                                                    Gender
                                                </Typography>
                                                <Box sx={{ margin: "13px 0" }}>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={child.gender}
                                                        onChange={handleChange}
                                                        name={`children.${index}.gender`}
                                                        fullWidth
                                                        displayEmpty
                                                        inputProps={{ "aria-label": "Without label" }}
                                                    >
                                                        <MenuItem value="" disabled>Choose one</MenuItem>
                                                        <MenuItem value="Male">Boy</MenuItem>
                                                        <MenuItem value="Female">Girl</MenuItem>
                                                    </Select>
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.children?.[index]?.gender &&
                                                            errors.children?.[index]?.gender
                                                        )}
                                                    >
                                                        {touched.children?.[index]?.gender &&
                                                            errors.children?.[index]?.gender}
                                                    </FormHelperText>
                                                </Box>
                                                {child.schoolId && 
                                                <>
                                                <Typography variant="h5" sx={{ textAlign: "start" }}>
                                                    Standard
                                                </Typography>
                                                <Box sx={{ margin: "13px 0" }}>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={child.standard}
                                                        onChange={handleChange}
                                                        name={`children.${index}.standard`}
                                                        fullWidth
                                                        displayEmpty
                                                        inputProps={{ "aria-label": "Without label" }}
                                                    >
                                                        <MenuItem value="" disabled>Choose one</MenuItem>
                                                        {[1, 2, 3, 4, 5, 6].map((value) => (
                                                            <MenuItem key={value} value={value.toString()}>
                                                                {value}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.children?.[index]?.standard &&
                                                            errors.children?.[index]?.standard
                                                        )}
                                                    >
                                                        {touched.children?.[index]?.standard &&
                                                            errors.children?.[index]?.standard}
                                                    </FormHelperText>
                                                </Box></>}

                                            </Grid>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                            <Grid>
                                <Box sx={{ marginTop: "26px" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isLoading}
                                        fullWidth
                                    >
                                        Save
                                        {isLoading && <ButtonCircularProgress />}
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        display: "grid",
                                        justifyContent: "center",
                                        mt: "13px",
                                    }}
                                ></Box>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>


        </MainBox>
    );
}

export default ChildProfile;
