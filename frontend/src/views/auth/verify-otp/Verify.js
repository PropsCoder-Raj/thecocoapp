import React, { useContext, useState } from "react";
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import toast from "react-hot-toast";
import moment from "moment";

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

function Verify(props) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    const url =
      location?.state?.type === "login"
        ? ApiConfig.loginVerifyOtp
        : ApiConfig.signupVerifyOtp;
    try {
      const res = await axios.post(url, {
        email: location?.state?.email.email || location?.state?.email,
        otp: values.otp,
      });

      if (res.status === 200) {
        if (location?.state?.type === "signUp") {
          navigate("/add-child");
        } else {
          navigate("/dashboard");
        }
        localStorage.setItem("token", res.data.token);
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
    const url = ApiConfig.signupGenerateOtp;
    try {
      const res = await axios.post(url, {
        email: location?.state?.email.email || location?.state?.email,
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
    <Page title="Verify">
      <Box sx={{ display: "grid", gap: "13px", textAlign: "center" }}>
        <Typography variant="h1" color={"rgba(67, 69, 71, 1)"} mt={1}>
          Verification
        </Typography>
        <Typography variant="h4" color={"rgba(67, 69, 71, 1)"}>
          You will get OTP via email
        </Typography>
        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={yup.object().shape({
            otp: yup
              .string()
              .length(4, "OTP must be 4 digits")
              .required("Please enter your OTP."),
          })}
          onSubmit={handleFormSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid sx={{ margin: "13px 0" }}>
                <Box>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.otp && errors.otp)}
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
                        justifyContent: "center",
                        width: "100%",
                        gap: "15px",
                      }}
                      OTPLength={4}
                      otpType="number"
                    />
                  </FormControl>
                  {touched.otp && errors.otp && (
                    <Typography color="error">{errors.otp}</Typography>
                  )}
                </Box>
              </Grid>

              <Grid>
                <Box sx={{ marginTop: "26px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    fullWidth
                    style={{ maxWidth: "370px" }}
                  >
                    Verify
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
                        color:"rgba(60, 60, 60, 1)",
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
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Page>
  );
}

export default Verify;
