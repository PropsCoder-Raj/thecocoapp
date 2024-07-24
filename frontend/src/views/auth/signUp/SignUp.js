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

function SignUp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
   const auth = useContext(AuthContext);
  const formInitialSchema = {
        email: "",
        name:"",
        pin:"",
        Cotp:""
      }
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(ApiConfig.signupVerifiedEmail, {
        email: values.email,
        name: values.name,
        pin: values.pin
      });

      if (res.status === 200) {
      toast.success(res.data.message);
      setIsLoading(false);
      navigate("/verify", {
        state: {
          email: values,
          type: "signUp",
        },
      });
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
    <Page title="Sign Up">
      <Box sx={{ display: "grid", gap: "13px", textAlign: "center" }}>
        <Typography variant="h1" color={"rgba(67, 69, 71, 1)"} mt={1}>
          Sign Up
        </Typography>
        <Typography variant="h4" color={"rgba(67, 69, 71, 1)"}>
          Join Coco, your financial friend
          <br />
          Learn, manage, grow!
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formInitialSchema}
          validationSchema={yup.object().shape({
            email: yup.string().required("Please enter your email address."),
            name: yup.string().required("Please enter your full name"),
            pin: yup
              .string()
              .length(4, "OTP must be 4 digits")
              .required("Please enter your OTP."),
            Cotp: yup
              .string()
              .length(4, "OTP must be 4 digits")
              .required("Please enter your OTP.")
               .oneOf(
                 [yup.ref("pin"), null],
                 "Pin should match."
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
            setFieldValue
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid sx={{ margin: "13px 0" }}>
                <TextField
                  placeholder="Your Full name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 256 }}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name && errors.name)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ marginTop: "5px" }}
                />
                <FormHelperText error>
                  {touched.name && errors.name}
                </FormHelperText>
                <TextField
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
                  style={{ marginTop: "13px" }}
                />
                <FormHelperText error>
                  {touched.email && errors.email}
                </FormHelperText>
              </Grid>
              <Grid sx={{ margin: "13px 0", textAlign: "start" }}>
                <Box >
                  <Typography variant="body1" color={"rgba(67, 69, 71, 1)"} sx={{ marginBottom: "13px" }}>
                    Enter 4-digit pin
                  </Typography>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.pin && errors.pin)}
                    sx={styles.otpFormControl}
                  >
                    <OTPInput
                      value={values.pin}
                      inputVariant="standard"
                      autoComplete="off"
                      onChange={(otpValue) => {
                        setFieldValue("pin", otpValue);
                      }}
                      name="pin"
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
                  {touched.pin && errors.pin && (
                    <FormHelperText error>{errors.pin}</FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid sx={{ margin: "13px 0", textAlign: "start" }}>
                <Box >
                  <Typography variant="body1" color={"rgba(67, 69, 71, 1)"} sx={{ marginBottom: "13px" }}>
                    Confirm 4-digit pin
                  </Typography>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.Cotp && errors.Cotp)}
                    sx={styles.otpFormControl}
                  >
                    <OTPInput
                      value={values.Cotp}
                      inputVariant="standard"
                      autoComplete="off"
                      onChange={(otpValue) => {
                        setFieldValue("Cotp", otpValue);
                      }}
                      name="Cotp"
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
                  {touched.Cotp && errors.Cotp && (
                    <FormHelperText error>{errors.Cotp}</FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid>
                <Box sx={{ marginTop: "18px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    fullWidth
                  >
                    Signup
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                 
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    justifyContent: "center",
                    mt: "13px",
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
                <Box sx={{ marginTop: "23px" }}>
                  <Typography variant="body1" color={"rgba(60, 60, 60, 1)"}>
                    By signing up, you agree to Coco’s
                    <br />
                    <span
                      onClick={() => {
                        navigate("/terms&condition");
                      }}
                      style={{
                        color: "rgba(0, 186, 242, 1)",
                        cursor: "pointer",
                      }}
                    >
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span
                      onClick={() => {
                        navigate("/privacy-policy");
                      }}
                      style={{
                        color: "rgba(0, 186, 242, 1)",
                        cursor: "pointer",
                      }}
                    >
                      Privacy Policy
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

export default SignUp;
