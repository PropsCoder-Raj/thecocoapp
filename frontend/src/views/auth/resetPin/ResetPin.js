import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import toast from 'react-hot-toast';
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import OTPInput from "otp-input-react";



const styles = {
    otpFormControl: {
        "& input": {
            color: "#0B1426",
            width: "48px !important",
            height: "48px !important",
            marginRight: "10px !important",
            border: "1px solid #D8D8D8",
            borderRadius: "8px",
            "@media(max-width:460px)": {
                width: "45px !important",
                height: "45px !important",
                marginRight: "7px !important",
            },
        },
    },
};
function ResetPin(props) {
    // const [isRememberMe, setIsRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const formInitialSchema =
        localStorage.getItem("emailReset")?
    {
                otp: ""
    }:{
        email: "",
    }
   
    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        const url = localStorage.getItem("emailReset") ? ApiConfig.setPinChange : ApiConfig.setPin
        const sendData = localStorage.getItem("emailReset") ? {
            email: localStorage.getItem("emailReset"),
            otp: values.otp,} : {
            email: values.email,}
        try {
            const res = await axios.post(url, sendData);
            if (res.status === 200) {
                if (localStorage.getItem("emailReset")){
                    navigate("/reset-pin-set",{
                    state:{
                            token:res.data.token
                    }
                });
                    auth.setEndTime(moment().add(0, "m").unix());
                    localStorage.removeItem("emailReset")
                }else{
                    localStorage.setItem("emailReset", values.email);
                    auth.setEndTime(moment().add(16, "s").unix());
                }
                toast.success(res.data.message);
                setIsLoading(false);
                
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong please try again later"
            );
            setIsLoading(false);
        }
    };
    const reSendOTPHandle = async () => {
        const url = ApiConfig.setPin;
        try {
            const res = await axios.post(url, {
                email: localStorage.getItem("emailReset"),
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                setIsLoading(false);
                auth.setEndTime(moment().add(16, "s").unix());
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong please try again later"
            );
            setIsLoading(false);
        }
    };
    return (
        <Page title="ResetPin">
            <Box sx={{ display: "grid", gap: "13px", textAlign: "center" }}>
                <Typography variant="h1" color={"rgba(67, 69, 71, 1)"} mt={1}>
                    Reset PIN
                </Typography>
                <Typography variant="h4" color={"rgba(67, 69, 71, 1)"}>
                    Forgot your PIN? 
                    <br />Reset it now to restore your access.
                </Typography>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={formInitialSchema}
                    validationSchema={yup.object().shape( localStorage.getItem("emailReset") ?
                    {
                            otp: yup
                                .string()
                                .length(4, "OTP must be 4 digits")
                                .required("Please enter your OTP."), } : 
                        
                    {    email: yup.string().required("Please enter your email address."),
                        
                    })}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                        setFieldValue
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid sx={{ margin: "13px 0" }}>
                                <TextField
                                    disabled={localStorage.getItem("emailReset")}
                                    placeholder="Email ID"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    inputProps={{ maxLength: 256 }}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email && errors.email)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    SX={{ padding: "8px 13px" }}
                                />
                                <FormHelperText error>
                                    {touched.email && errors.email}
                                </FormHelperText>
                            </Grid>
                            {localStorage.getItem("emailReset")  ? 
                            <Grid sx={{ margin: "13px 0", textAlign: "start" }}>
                                <Box >
                                    <Typography variant="body1" color={"rgba(67, 69, 71, 1)"} sx={{ marginBottom: "13px" }}>
                                        Enter your 4-digit otp
                                    </Typography>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.pin && errors.pin)}
                                        sx={styles.otpFormControl}
                                    >
                                        <OTPInput
                                            value={values.otp}
                                            inputVariant="standard"
                                            autoComplete="off"
                                            onChange={(otpValue) => {
                                                setFieldValue("otp", otpValue);
                                            }}
                                            name="otp"
                                            id="inputID"
                                            style={{
                                                display: "flex",
                                                justifyContent: "start",
                                                width: "100%",
                                                gap: "15px",
                                            }}
                                            OTPLength={4}
                                            otpType="number"
                                        />
                                    </FormControl>
                                    {touched.otp && errors.otp && (
                                        <FormHelperText error>{errors.otp}</FormHelperText>
                                    )}
                                </Box>
                            </Grid>:""
                           }
                            <Grid>
                                <Box sx={{ marginTop: "26px" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isLoading}
                                        fullWidth
                                    >
                                        Submit
                                        {isLoading && <ButtonCircularProgress />}
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        mt: "13px",
                                    }}
                                >
                                    {auth.timeLeft?.minutes > 0 || auth.timeLeft?.seconds > 0 ? (
                                        <Typography
                                            variant="h3"
                                            style={{
                                                color: "rgba(60, 60, 60, 1)",
                                                fontSize: "18px",
                                                fontStyle: "normal",
                                                fontWeight: "500",
                                                lineHeight: "24px",
                                            }}
                                        >
                                            Resend OTP in
                                            &nbsp;
                                            {auth.timeLeft?.minutes?.toString().padStart(2, "0")}:
                                            {auth.timeLeft?.seconds?.toString().padStart(2, "0")}
                                            &nbsp;s
                                        </Typography>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: "grid",
                                                justifyContent: "center",
                                                mt: "13px",
                                            }}
                                        >
                                            <Typography variant="body1" color={"rgba(60, 60, 60, 1)"}>
                                                Didn’t get OTP?
                                                <span
                                                    style={{
                                                        color: "rgba(0, 186, 242, 1)",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={reSendOTPHandle}
                                                >
                                                    &nbsp;Resend OTP
                                                </span>
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: "grid",
                                        justifyContent: "center",
                                        mt: "20px",
                                    }}
                                >
                                    <Typography variant="body1" color={"rgba(60, 60, 60, 1)"}>
                                        Have an account?
                                        <span
                                            onClick={() => {
                                                navigate("/login");
                                            }}
                                            style={{
                                                color: "rgba(0, 186, 242, 1)",
                                                cursor: "pointer",
                                            }}
                                        >
                                            &nbsp;Log In
                                        </span>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Page>
    );
}

export default ResetPin;
