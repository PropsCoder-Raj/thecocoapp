import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { IoMdArrowBack } from "react-icons/io";
import { usePreviousPathname } from "src/utils";

const style = {
  flexBox: {
    display: "flex",
    gap: "5px",
    alignItems:"center",
    cursor:"pointer"
  },
};
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
  padding:"12px 5px"
}));

export default function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPathname = usePreviousPathname();
 const navigateToPrevious = () => {
   if (location.pathname === "/login") {
     navigate("/");
   } else {
     navigate("/login");
   }
 };
  return (
    <>
      <Root>
        <Container>
        <Box sx={style.flexBox} onClick={()=>{ navigateToPrevious()}}>
          <IoMdArrowBack />
          <Typography>Back</Typography>
        </Box>
        </Container>
      </Root>
    </>
  );
}
