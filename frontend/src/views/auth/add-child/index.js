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
import { useNavigate } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { LuMinusCircle } from "react-icons/lu";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import toast from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineDoubleRight } from "react-icons/ai";

function AddChild(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [schoolData, setSchoolData] = useState([]);
  const [schoolIds, setSchoolIds] = useState([]);
  const [selectedChild, setSelectedChild] = useState(1);
  const [checkId, setcheckId] = useState(false);
  const navigate = useNavigate();

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
    }));
    try {
      const res = await axios.post(
        ApiConfig.createChild, requestBody,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSchool();
  }, []);

  const getSchool = async () => {
    try {
      const res = await axios.get(ApiConfig.getSchool);
      if (res.status === 200) {
        setSchoolData(res.data.data);
        setSchoolIds(res.data.data.map((ele) => ele?.schoolId));
      }
    } catch (error) {
      // console.error(error.response.data.message)
    }
  };
//schoolIdCheck
    const schoolIdCheck = async (value) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios({
                method: "GET",
                url: ApiConfig.schoolIdCheck,
                headers: { token: token },
                params: { school_id :value }
            });
            if (res.status === 200) {
                // setcheckId(res.data.data);
                console.log(res.data.data, "reslut");
                setcheckId(res.data.data)
            }
        } catch (error) {
            console.log(error, "error");
        }
    };
  return (
    <Page title="Add Child">
      <Box sx={{ display: "grid", gap: "13px", textAlign: "center" }}>
        <Typography variant="h1" color={"rgba(67, 69, 71, 1)"} mt={1}>
          Let’s find the right modules for you
        </Typography>
        <Typography variant="h4" color={"rgba(67, 69, 71, 1)"}>
          This helps us show modules that are tailored for your child
        </Typography>
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
                        <Typography
                          variant="h5"
                          sx={{ textAlign: "start", marginBottom: "7px" }}
                        >
                          {index === 0 ? "First child" : `Child ${index + 1}`}
                        </Typography>
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
                          {/* <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={child.schoolId}
                            onChange={handleChange}
                            name={`children.${index}.schoolId`}
                            fullWidth
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {getData.map((value) => (
                              <MenuItem key={value._id} value={value._id}>
                                {value.schoolName}
                              </MenuItem>
                            ))}
                          </Select> */}
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
                              {[4, 5, 6, 7, 8, 9, 10].map((value) => (
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
                        {selectedChild === 1 ? (
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
                              push({
                                name: "",
                                schoolId: "",
                                dob: "",
                                gender: "",
                                standard: "",
                              });
                              setSelectedChild(2);
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
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
                        ) : (
                          <Box
                            sx={{
                              padding: "11px 13px",
                              border: "1px solid rgba(216, 216, 216, 1)",
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: "5px",
                              alignItems: "center",
                              cursor: "pointer",
                              marginTop: "10px",
                            }}
                            onClick={() => {
                              remove(index);
                              setSelectedChild(1)
                            }}

                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              <LiaUserCircleSolid
                                style={{ color: "#D8D8D8", fontSize: "25px" }}
                              />
                              <Typography variant="body2">
                                Remove child
                              </Typography>

                            </Box> <LuMinusCircle
                              style={{ color: "#D8D8D8", fontSize: "22px" }}
                            />
                          </Box>
                        )}
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
                    Continue
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                  <Box sx={{ display: "flex", justifyContent: "center",marginTop:"18px", cursor:"pointer",
                    alignItems: "center", gap: "8px" }} onClick={()=>{navigate("/dashboard")}}>
                      <Typography variant="body1" color={"rgba(0, 186, 242, 1)"}>Skip</Typography>
                      <AiOutlineDoubleRight style={{ color: "rgba(0, 186, 242, 1)" }} /></Box> 
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

export default AddChild;
