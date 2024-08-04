import React, { useState } from "react";
import { Box, Container, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Snackbar } from "@mui/material";
import styled from "@emotion/styled";
import { MdOutlineExpandMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const style = {
  paperBox: {
    display: "grid",
    gap: "16px",
    alignItem: "center",
    padding: "20px",
  },
  innerBox: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  innerSmallBox: {
    display: "flex",
    gap: "12px",
  },
  customCoutBox: {
    background: "#B186F3",
    borderRadius: "50%",
    color: "#fff",
    width: "34px",
    height: "34px",
    textAlign: "center",
  },
};
const StyledImg = styled("img")(({ theme }) => ({
  width: "-webkit-fill-available",
  height: "auto",
}));

const BoxCenter = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const BorderCss = styled("div")(({ theme }) => ({
  borderLeft: "1px dashed #63B3ED",
  borderInlineWidth: "3px",
  marginLeft: "16px",
  marginTop: "8px",
  marginBottom: "8px",
  minHeight: "106px"
}));
function GettingStarted() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const CardData = [
    {
      title: "Get in touch with us",
      subText: [
        "It all starts with a conversation! ",
        "Send us email at edupartners@thecocoapp.com",
        "Our representative will contact you shortly",
      ],
    },
    {
      title: "School verification",
      subText: [
        "You need to fill up some details of the school  ",
        "Verification is done within 1 working day",
        "After verification unique school ID is generated",
      ],
    },
    {
      title: "Get started with Cocoapp",
      subText: [
        "Teacher training is provided to get student started ",
        "Introduction of cocoapp to parents and students",
        "Periodically progress of the student is sent to you ",
      ],
    },
  ];
  const [expanded, setExpanded] = useState(null);

  const handleExpansion = (key) => {
    setExpanded(expanded === key ? null : key);
  };
  return (
    <Container maxWidth="lg">
      <Box mt={2} mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <BoxCenter>
              <Typography variant="h1">Getting Started Is Easy</Typography>
            </BoxCenter>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box mt={2}>
              <StyledImg alt="" src="images/GettingStarted.png" />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            {CardData.map((value, index) => {
              return (
                <Box mt={2}>
                  <Box sx={style.innerBox}>
                    <Box sx={style.customCoutBox}>{index + 1}</Box>
                    <Typography variant="h3" fontWeight={700}>
                      {value.title}
                    </Typography>
                  </Box>
                  <Box sx={style.innerBox}>
                    {index === 2 ? (
                      <Box
                        sx={{
                          marginLeft: "16px",
                          marginTop: "8px",
                          marginBottom: "8px",
                          minHeight: "106px",
                        }}
                      ></Box>
                    ) : (
                      <BorderCss></BorderCss>
                    )}
                    <Box
                      sx={{
                        marginLeft: "18px",
                        display: "grid",
                        gap: "5px",
                        marginTop: "8px",
                      }}
                    >
                      {value.subText.map((item) => {
                        return (
                          <Box sx={style.innerSmallBox}>
                            <img src="images/iconGreen.svg" alt="tick" />
                            <Typography variant="h6">{item}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <Box mt={3}>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.getItem("token") ? navigate("/dashboard") : navigate("/login");
                }}
              >
                Get started
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
              },
            }}
          >
            <Box>
              {CardData.map((value, index) => (
                <Box key={index} sx={index === 0 ? {} : { marginTop: "15px" }}>
                  <Accordion
                    expanded={expanded === index}
                    style={{ border: "0.5px solid #D2ECFF", padding: "10px" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <MdOutlineExpandMore
                          style={{ color: "#4299E1", fontSize: "30px" }}
                        />
                      }
                      onClick={() => handleExpansion(index)} // Handle click on summary
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <Box sx={style.innerBox}>
                        <Box sx={style.customCoutBox}>{index + 1}</Box>
                        <Typography variant="h3" fontWeight={700}>
                          {value.title}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {value.subText.map((subItem, subIndex) => (
                        <Box
                          sx={style.innerSmallBox}
                          style={{ margin: "10px 0" }}
                        >
                          <img src="images/iconGreen.svg" alt="tick" />
                          <Typography variant="h6" key={subIndex}>
                            {subItem}
                          </Typography>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
            <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.getItem("token") ? navigate("/dashboard") : navigate("/login");
                }}
                sx={{ width: "260px" }}
              >
                Get started
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        ContentProps={{
          sx: {
            background: "rgba(20, 23, 25, 1)",
          },
        }}
        bodyStyle={{ minWidth: "288pxpx" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Cocoapp Launches in July!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      // action={action}
      />
    </Container>
  );
}

export default GettingStarted;
