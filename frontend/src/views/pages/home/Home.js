import React, { useContext, useEffect } from "react";
import Page from "../../../component/Page";
import SettingsContext from "src/context/SettingsContext";
import HeroSection from "./HeroSection";
import FreeFunEffective from "./FreeFunEffective";
import OurMission from "./OurMission";
import FeedBack from "./FeedBack";
import styled from "@emotion/styled";
import CocoApp from "./CocoApp";
import BenifitsSection from "./BenifitsSection";
import GettingStarted from "./GettingStarted";
import AskQuestions from "./AskQuestions";
import Footer from "src/views/content/Footer";
import { Box, keyframes } from "@mui/material";

const SectionFunBack = styled("section")(({ theme }) => ({
  backgroundImage: "url('/images/FreeFunBackground.png')",
  backgroundSize: "cover",
  paddingBottom: "5px",
  paddingTop: "40px",
  minHeight: "200px",
  width: "100%",
  backgroundColor: "#F3F8FB",
  "@media(max-width:767px)": {
    paddingTop: "15px",
  },
  "@media(max-width:900px)": {
    backgroundImage: "url('/images/freeFunMobile.png')",
  },
}));

const SectionFeedBack = styled("section")(({ theme }) => ({
  backgroundImage: "url('/images/feedbackBackground.png')",
  backgroundSize: "cover",
  paddingBottom: "5px",
  paddingTop: "40px",
  minHeight: "200px",
  width: "100%",
  backgroundColor: "#FCF7FF",
  "@media(max-width:1000px)": {
    paddingTop: "20px",
  },
  "@media(max-width:767px)": {
    paddingTop: "5px",
  },
  "@media(max-width:900px)": {
    backgroundImage: "url('/images/feedbackMobileScreen.png')",
  },
}));
const SectionBenifits = styled("section")(({ theme }) => ({
  backgroundImage: "url('/images/Benifits.png')",
  backgroundSize: "cover",
  paddingBottom: "5px",
  paddingTop: "40px",
  minHeight: "200px",
  width: "100%",
  backgroundColor: "#FCF7FF",
  "@media(max-width:767px)": {
    paddingTop: "15px",
  },
}));
const GetStart = styled("section")(({ theme }) => ({
  backgroundImage: "url('/images/getStart.png')",
  backgroundSize: "cover",
  paddingBottom: "5px",
  paddingTop: "40px",
  minHeight: "200px",
  width: "100%",
  "@media(max-width:767px)": {
    paddingTop: "15px",
  },
}));
const AskQuestionsBack = styled("section")(({ theme }) => ({
  backgroundImage: "url('/images/askQuestions.png')",
  backgroundSize: "cover",
  paddingBottom: "5px",
  paddingTop: "40px",
  minHeight: "200px",
  width: "100%",
  backgroundColor: "#FCF7FF",
  "@media(max-width:767px)": {
    paddingTop: "15px",
  },
  "@media(max-width:900px)": {
    backgroundImage: "url('/images/askMobile.png')",
  },
}));
function Home() {
  const { settings, saveSettings } = useContext(SettingsContext);

  const toggleTheme = () => {
    saveSettings({ theme: settings.theme === "LIGHT" ? "DARK" : "LIGHT" });
  };
  useEffect(() => {
    localStorage.removeItem("emailReset")
  }, [])
  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust this value to control the bounce height */
  }
`;
  const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
  return (
    <Page title="Home">
      <section>
        <Box sx={{ position: "relative", animation: `${bounce} 1s infinite`, zIndex: "-1", display:{xs:"none", sm:"none", md:"block"} }}>
          <img
            style={{
              position: "absolute",
              left: "10px",
              top: "50px",
            }}
            src="images/energy-icon.svg"
            alt=""
          /></Box>
        <HeroSection />
        <Box sx={{ position: "relative", animation: `${bounce} 1s infinite`, zIndex: "-1", display: { xs: "block", sm: "block", md: "none" } }}>
          <img
            style={{
              position: "absolute",
              left: "10px",
              bottom: "0px",
            }}
            src="images/energy-icon.svg"
            alt=""
          /></Box>
      </section>
      <SectionFunBack>
        <FreeFunEffective />
      </SectionFunBack>
      <section>
        <OurMission />
      </section>
      <SectionFeedBack>
        <FeedBack />
      </SectionFeedBack>
      <section>
        <Box sx={{ position: "relative", animation: `${bounce} 1s infinite`, zIndex: "-1", display: { xs: "none", sm: "none", md: "block" } }}>

          <img
            alt=""
            className="positionAbosolute EnergyIconPositionContactSection"
            src="images/energy-icon.svg"
            style={{ top: "unset !important" }}
          />
        </Box>
        <CocoApp />
      </section>
      <SectionBenifits>
        <BenifitsSection />
      </SectionBenifits>
      <GetStart>
        <GettingStarted />
      </GetStart>
      <AskQuestionsBack>
<AskQuestions/>
      </AskQuestionsBack>
      <div>
        <Footer />
      </div>
    </Page>
  );
}

export default Home;
