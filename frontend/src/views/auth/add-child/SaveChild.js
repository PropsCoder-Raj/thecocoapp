import React, { useRef, useState } from "react";
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
import { Form, Formik } from "formik";
import * as yup from "yup";
import Page from "src/component/Page";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import toast from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";

function SaveChild(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [childAdd, setChildAdd] = useState(false);
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const formInitialSchema = {
    name: "",
    schoolId: "",
    dob: "",
    gender: "",
    standard: "",
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(ApiConfig.loginGenerateOtp, {
        childName: values.name,
        schoolId: values.schoolId,
        dob: values.dob,
        standard: values.standard,
        gender: values.gender,
      });
      // pass token as header

      if (res.status === 200) {
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

  return (
    <Page title="Save Child">
      <Box sx={{ display: "grid", gap: "13px", textAlign: "center" }}>
        {!childAdd && (
          <Typography variant="h1" color={"rgba(67, 69, 71, 1)"} mt={1}>
            Let’s find the right modules for you
          </Typography>
        )}
        {!childAdd && (
          <Typography variant="h4" color={"rgba(67, 69, 71, 1)"}>
            This helps us show modules that are tailored for your child
          </Typography>
        )}
        {!childAdd && (
          <Box>
            <Typography variant="h5" sx={{ textAlign: "start" }}>
              Child Info
            </Typography>
            <Box
              sx={{
                padding: "11px 13px",
                border: "1px solid rgba(216, 216, 216, 1)",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "5px",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setChildAdd(true);
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <LiaUserCircleSolid
                  style={{ color: "#D8D8D8", fontSize: "25px" }}
                />
                <Typography variant="body2">Add child</Typography>
              </Box>

              <GrAddCircle style={{ color: "#D8D8D8", fontSize: "22px" }} />
            </Box>
          </Box>
        )}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formInitialSchema}
          validationSchema={yup.object().shape({
            name: yup.string().required("Please enter your full name."),
            schoolId: yup.string().required("Please enter your School ID."),
            dob: yup.string().required("Date of birth is required."),
            gender: yup.string().required("Please select a gender."),
            standard: yup.string().required("Please choose a standard."),
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
              {childAdd && (
                <Grid sx={{ margin: "13px 0" }}>
                  <Typography
                    variant="h5"
                    sx={{ textAlign: "start", marginBottom: "7px" }}
                  >
                    First child
                  </Typography>
                  <Box sx={{ margin: "13px 0" }}>
                    <TextField
                      placeholder="Child's full name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      inputProps={{ maxLength: 256 }}
                      value={values.name}
                      name="name"
                      error={Boolean(touched.name && errors.name)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText
                      error={Boolean(touched.name && errors.name)}
                    >
                      {touched.name && errors.name}
                    </FormHelperText>
                  </Box>
                  <Box sx={{ margin: "13px 0" }}>
                    <TextField
                      placeholder="School ID"
                      variant="outlined"
                      fullWidth
                      size="small"
                      inputProps={{ maxLength: 256 }}
                      value={values.schoolId}
                      name="schoolId"
                      error={Boolean(touched.schoolId && errors.schoolId)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText
                      error={Boolean(touched.schoolId && errors.schoolId)}
                    >
                      {touched.schoolId && errors.schoolId}
                    </FormHelperText>
                  </Box>
                  <Box sx={{ margin: "13px 0" }}>
                    <TextField
                      placeholder="DD/MM/YYYY"
                      variant="outlined"
                      fullWidth
                      size="small"
                      inputProps={{ maxLength: 256 }}
                      value={values.dob}
                      name="dob"
                      error={Boolean(touched.dob && errors.dob)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error={Boolean(touched.dob && errors.dob)}>
                      {touched.dob && errors.dob}
                    </FormHelperText>
                  </Box>
                  <Typography variant="h5" sx={{ textAlign: "start" }}>
                    Gender
                  </Typography>
                  <Box sx={{ margin: "13px 0" }}>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={values.gender}
                      onChange={handleChange}
                      name="gender"
                      fullWidth
                      label="Select an option"
                    >
                      <MenuItem value="boy">Boy</MenuItem>
                      <MenuItem value="girl">Girl</MenuItem>
                    </Select>
                    <FormHelperText
                      error={Boolean(touched.gender && errors.gender)}
                    >
                      {touched.gender && errors.gender}
                    </FormHelperText>
                  </Box>
                  <Typography variant="h5" sx={{ textAlign: "start" }}>
                    Standard
                  </Typography>
                  <Box sx={{ margin: "13px 0" }}>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={values.standard}
                      onChange={handleChange}
                      name="standard"
                      fullWidth
                      label="Select an option"
                    >
                      {[1, 2, 3, 4, 5, 6].map((value) => (
                        <MenuItem key={value} value={value.toString()}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={Boolean(touched.standard && errors.standard)}
                    >
                      {touched.standard && errors.standard}
                    </FormHelperText>
                  </Box>

                  <Typography variant="h5" sx={{ textAlign: "start" }}>
                    Add another child
                  </Typography>
                  <Box
                    sx={{
                      padding: "11px 13px",
                      border: "1px solid rgba(216, 216, 216, 1)",
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "5px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: "8px", alignItems: "center" }}
                    >
                      <LiaUserCircleSolid
                        style={{ color: "#D8D8D8", fontSize: "25px" }}
                      />
                      <Typography variant="body2">Add child</Typography>
                    </Box>
                    <GrAddCircle
                      style={{ color: "#D8D8D8", fontSize: "22px" }}
                    />
                  </Box>
                </Grid>
              )}
              <Grid>
                <Box sx={{ marginTop: "26px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    fullWidth
                  >
                    Continue
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
    </Page>
  );
}

export default SaveChild;
