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
import { Helmet } from "react-helmet";

import AdSense from "../../../component/AdSense";

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
    backgroundImage: "url('/images/BenifitsMobile.png')",
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
    localStorage.removeItem("emailReset");
  }, []);

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

  const getMetaTitle = () => {
    const hash = window.location.hash;
    switch (hash) {
      case "#freefuneffective":
        return "Free Fun Effective";
      case "#ourmission":
        return "Our Mission";
      case "#feedback":
        return "Feedback";
      case "#cocoapp":
        return "Coco App";
      case "#benefits":
        return "Benefits";
      case "#getstarted":
        return "Getting Started";
      case "#askquestions":
        return "Ask Questions";
      default:
        return "Home";
    }
  };

  const getMetaDescription = () => {
    const hash = window.location.hash;
    switch (hash) {
      case "#freefuneffective":
        return "Discover how our Free Fun Effective section offers engaging and enjoyable activities designed to boost your experience. Explore exciting features and opportunities that enhance your fun.";
      case "#ourmission":
        return "Learn about our mission to provide exceptional value and make a positive impact. Our mission section highlights our core values and the goals we strive to achieve for our community.";
      case "#feedback":
        return "Read testimonials and feedback from our users. This section showcases real experiences and insights from those who have benefited from our services and products.";
      case "#cocoapp":
        return "Explore the Coco App section to find out how our innovative app can simplify your life. Discover its features, benefits, and how it stands out from the competition.";
      case "#benefits":
        return "Uncover the numerous benefits offered in our Benefits section. Learn how our services can add value and improve your overall experience with us.";
      case "#getstarted":
        return "Get started with ease by exploring our Getting Started section. Find all the resources and steps you need to begin your journey and make the most of our offerings.";
      case "#askquestions":
        return "Have questions? Our Ask Questions section provides answers to common queries and additional support to help you get the information you need.";
      default:
        return "Welcome to our homepage. Explore our offerings and learn more about what we have to offer.";
    }
  };


  return (
    <Page title="Home">
      <Helmet>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <link rel="canonical" href={`https://thecocoapp.com/${window.location.hash}`} />
      </Helmet>
      <section id="hero">
        <Box sx={{ position: "relative", animation: `${bounce} 1s infinite`, zIndex: "-1", display: { xs: "none", sm: "none", md: "block" } }}>
          <img
            style={{
              position: "absolute",
              left: "10px",
              top: "50px",
            }}
            src="images/energy-icon.svg"
            alt=""
          />
        </Box>
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
          />
        </Box>
      </section>
      <SectionFunBack id="freefuneffective">
        <FreeFunEffective />
      </SectionFunBack>
      <section id="ourmission">
        <OurMission />
      </section>
      <SectionFeedBack id="feedback">
        <Box sx={{
          display: { md: 'inline-block', sm: "none", xs: "none" },
          animation: `${rotate} 5s linear infinite`,
          position: "relative",
          top: {
            md: "0",
            sm: "0px",
            xs: "0px"
          },
          right: "60px",
          float: {
            md: "inline-end",
            sm: "inline-end",
            xs: "inline-end"
          }
        }}>
          <img src="images/round-icon.svg" alt="" />
        </Box>
        <FeedBack />
      </SectionFeedBack>
      <section id="cocoapp">
        <Box sx={{ position: "relative", animation: `${bounce} 1s infinite`, zIndex: "-1", display: { xs: "none", sm: "none", md: "block" }, top: "34px" }}>
          <img
            alt=""
            className="positionAbosolute EnergyIconPositionContactSection"
            src="images/energy-icon.svg"
            style={{ top: "unset !important" }}
          />
        </Box>
        <CocoApp />
      </section>
      <SectionBenifits id="benefits">
        <BenifitsSection />
      </SectionBenifits>
      <GetStart id="getstarted">
        <Box sx={{
          display: 'inline-block',
          animation: `${rotate} 5s linear infinite`,
          position: "relative",
          zIndex: "1",
          top: "30px",
          left: "34%",
        }}>
          <img
            className="positionAbosolute StarIconPosition"
            src="images/star-icon.svg"
            alt=""
          />
        </Box>
        <GettingStarted />
      </GetStart>
      <div className="adsence-block" style={{ width: "80%", margin: '100px auto' }}>
        <AdSense className="adsence-block" />
      </div>
      <AskQuestionsBack id="askquestions">
        <AskQuestions />
      </AskQuestionsBack>
      <div>
        <Footer />
      </div>
    </Page>
  );
}

export default Home;
