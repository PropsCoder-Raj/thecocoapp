import React, { useState, useEffect, useRef, useContext } from "react";
import { Box, Container, Dialog, DialogActions, DialogContent, Grid, LinearProgress, Typography, keyframes, styled, useMediaQuery } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go";
import { IoChevronBackCircle } from "react-icons/io5";
import { IoChevronForwardCircle } from "react-icons/io5";
import { handleSpeak, stopSpeak, getVoice } from "src/utils";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import toast from "react-hot-toast";
import { FaAngleDoubleUp, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useTheme } from "@emotion/react";
import { useSwipeable } from "react-swipeable";
import { UserContext } from "src/context/User";
import html2canvas from 'html2canvas';
import useSound from "use-sound";
import AdSense from "src/component/AdSense";
import { isMobile } from 'react-device-detect';
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { Button } from "react-scroll";
import { CopyToClipboard } from "react-copy-to-clipboard";

const bottomToTop = keyframes`
  0% {
    background-position: bottom;
  }
  100% {
    background-position: top;
  }
`;
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust this value to control the bounce height */
  }
`;
const style = {
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",

    "@media(max-width:1000px)": {},
    "@media(max-width:767px)": {},
  },
  gridBox: {
    display: "grid",
    gap: "16px",
    maxWidth: "700px",
    "@media(max-width:900px)": {
      maxWidth: "-webkit-fill-available",
      paddingRight: "25px"
    },

  },
  logoBox: {
    height: "-webkit-fill-available",
    alignItems: "end",
    display: "grid",
    justifyContent: "start",
    // paddingBottom: {
    //   md: "0px",
    //   sm: "90px",
    //   xs: "90px"
    // },
  },
  CombineBox: {
    display: "grid",
    paddingBottom: "20px",
    alignItems: "flex-start",

    height: {
      md: "calc(100vh - 160px)",
      sm: "calc(100vh - 160px)",
      xs: "calc(100vh - 160px)"
    },
    "@media(max-width:900px)": {
      position: "fixed",
      top: "56px",
      padding: "0"
    },
  },
  buttonHandle: {
    display: "flex",
    justifyContent: "end",
    gap: "8px",
  },
  lightDailogOpen: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      maxWidth: "fit-content",
      padding: "20px",
      borderRadius: "20px",
      background: "#FFF",
      boxShadow: "3px 4px 9px 0px rgba(0, 0, 0, 0.25)",
      // [theme.breakpoints.down('md')]: {
      //   padding: "30px",
      // },
      // [theme.breakpoints.down('sm')]: {
      //   padding: "5px",
      // },
    },
  "& .facebook": {
    background: "#0088cc",
    width: "100%",
    height: "48px",
      border: "none",
    borderRadius: "30px",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    "&:hover": {
      background: "#0088cc",
    },
  },
   "& .twitter": {
    background: "#0DCAF0",
    width: "100%",
     border: "none",
    height: "48px",
    borderRadius: "30px",
    fontStyle: "normal",
    fontWeight: "400",
    textTransform: "none",
    fontSize: "16px",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    "&:hover": {
      background: "#00d2fc",
    },
  },
   "& .google": {
    background:
      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    width: "100%",
    height: "48px",
    borderRadius: "30px",
    fontStyle: "normal",
    textTransform: "none",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    border:"none"
  },
   "& .whatsapp": {
    background: "#4AEB67",
    width: "100%",
     border: "none",
    height: "48px",
    borderRadius: "30px",
    fontStyle: "normal",
    textTransform: "none",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
  },
   "& .emailButton": {
    background: "#0F91F2",
    width: "100%",
    height: "48px",
     border: "none",
    borderRadius: "30px",
    fontStyle: "normal",
    fontWeight: "400",
    textTransform: "none",
    fontSize: "16px",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    "&:hover": {
      background: "#0F91F2",
    },
  },}
};
const MainBox = styled(Box)(({ theme }) => ({
  padding: "54px 0px 0 0px",
  height: "calc(100vh - 54px)",
  [theme.breakpoints.down("md")]: {
    padding: "36px 0px 0 0px",
    height: "calc(100vh - 36px)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "36px 0px 0 0px",
    height: "calc(100vh - 36px)",
  },
  [theme.breakpoints.down("xs")]: {
    padding: "36px 0px 0 0px",
    height: "calc(100vh - 36px)",
  },
  overflow: "auto",
  alignItems: "end",
  justifyContent: "space-between",
  alignContent: "space-between",

}));
const InnerBox = styled(Box)(({ theme }) => ({
  display: "grid",
  alignItems: "end",
  height: "71px",
  transition: "all 0.1s ease-in-out"
}));
const AddImg = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
}));
const SchoolLogo = styled("img")(({ theme }) => ({
  width: "60px",
  height: "60px",
}));
const CustomLinearProgress = styled(LinearProgress)(({ progressColor }) => ({
  width: "-webkit-fill-available",
  height: "10px",
  backgroundColor: "rgba(216, 216, 218, 1)",
  borderRadius: "4px",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "4px",
  },
}));


function Leason(props) {
  const navigate = useNavigate();
  let min = 1;
  const theme = useTheme();
  const User = useContext(UserContext);
  const isMobileChild = useMediaQuery(theme.breakpoints.down('md'));
  const [progress, setProgress] = useState(1);
  const location = useLocation();

  const [leasonData, setLeasonData] = useState([]);
  const [max, setMax] = useState(leasonData.length);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [swipeUp] = useSound('sound/swoosh-sound-effects.mp3');
  useEffect(() => {
    getleasonData();
  }, [location?.state?.level_id])
  const getleasonData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getLeason}/${location?.state?.level_id}/${location?.state?.module_id}`,
        headers: { token: token },
        // params:{
        //   level_id: location?.state?.level_id,
        //   module_id: location?.state?.module_id
        // }
      });
      if (res.status === 200) {
        setLeasonData(res.data.result)
        setMax(res.data.result.length)
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const increaseProgress = () => {
    setProgress((prev) => (prev < max ? prev + 1 : max));

    setAnimationTrigger(true);

  };
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voicesChanged = () => {
      setSelectedVoice(getVoice());
    };

    synth.onvoiceschanged = voicesChanged;
    voicesChanged(); // Initial call

    return () => {
      stopSpeak(); // Stop speaking when the component is unmounted
    };
  }, []);
  const decreaseProgress = () => {
    stopSpeak();
    setProgress((prev) => (prev > min ? prev - 1 : min));
    setAnimationTrigger(true);

  };

  const calculateProgressValue = () => ((progress - min) / (max - min)) * 100;




  useEffect(() => {
    if (animationTrigger) {
      const timer = setTimeout(() => {
        setAnimationTrigger(false);
      }, 1000); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [animationTrigger]);

  const getBackground = (progress) => {
    switch (progress) {
      case 3:
        return 'rgba(255, 246, 200, 1)';
      case 2:
        return 'rgba(240, 220, 255, 1)';
      default:
        return 'rgba(255, 220, 234, 1)';
    }
  };
  const [swipedUp, setSwipedUp] = useState(false);
  const [swipingDirection, setSwipingDirection] = useState('');
  const [isLogout, setIsLogout] = useState(false);
  const handleSwipedUp = () => {
    stopSpeak();
    setSwipedUp(true);
    setSwipingDirection('up');
    increaseProgress();
    swipeUp();
    if (progress === max) {
      navigate("/take-quiz", {
        state: {
          module_id: location?.state?.level_id,
          level_id: location?.state?.module_id,
        },
      });
    }
  };

  const handleSwipedDown = () => {
    stopSpeak();
    setSwipedUp(false);
    setSwipingDirection('down');
    decreaseProgress();
    swipeUp();
  };

  const handleSwiping = (e) => {
    const { dir } = e;
    if (dir === 'Up' || dir === 'Down') {
      setSwipingDirection(`Swiping ${dir.toLowerCase()}`);

    }
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipedUp,
    onSwipedDown: handleSwipedDown,
    onSwiping: handleSwiping,
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleTouchMove = (event) => {
      if (event.touches.length > 1) {
        return;
      }
      event.preventDefault();
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  function shareOnInstagram(code) {
    const instagramURL = "https://www.instagram.com/";
    const shareURL = `${instagramURL}create`;
    window.open(shareURL, "_blank");
  }


  
  return (

    <MainBox
      ref={containerRef}
      sx={{
        background: getBackground(progress),
        backgroundSize: '100% 200%',
        backgroundPosition: 'bottom',
        animation: animationTrigger ? `${bottomToTop} 1s forwards` : 'none',
        transition: 'background 1s',// Smooth transition effect,
      }}
      id="capture-area"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8} sx={{
            height: "calc(100vh - 100px)",
            overflow: "auto",
            paddingTop: {
              xs: "0px !important",
              sm: "32px !important",
              md: "32px"
            }
          }}>
            <Box sx={style.CombineBox}>
              <Box sx={style.gridBox}>
                <Box sx={style.flexBox}>
                  <IoMdClose
                    color="rgba(0, 0, 0, 1)"
                    onClick={() => {
                      navigate("/dashboard");
                      stopSpeak();
                    }}
                    cursor={"pointer"}
                  />
                  <Box
                    sx={{ display: "flex", gap: "16px", alignItems: "center" }}
                  >
                    <GoShareAndroid cursor={"pointer"} color="rgba(0, 0, 0, 1)" onClick={() => { setIsLogout(true)}} />
                  </Box> 
                </Box>
                <Box sx={{}}>
                  <Typography variant="h1"
                  // sx={{textAlign: "justify"}}
                  >{leasonData[progress - 1]?.name || "--"}</Typography>
                  <Typography variant="h4"

                    sx={{
                      marginTop: "14px",
                      textAlign: "justify"
                    }}>
                    {leasonData[progress - 1]?.description || "--"}
                  </Typography>
                </Box>
              </Box>
              {!isMobileChild &&
                <Box sx={style.logoBox}>
                  <Box
                    sx={{ display: "flex", alignItems: "start", gap: "15px" }}
                  >
                    {User?.profile?.schoolLogo &&
                      <SchoolLogo alt="#" src={User?.profile?.schoolLogo} />}
                    <Box>

                      {User?.profile?.schoolName &&
                        <Typography variant="body2">
                          {User?.profile?.schoolName}
                        </Typography>}
                      {User?.profile?.schoolAddress && <Typography variant="body2">{User?.profile?.schoolAddress}</Typography>}
                    </Box>
                  </Box>
                </Box>}
            </Box>
          </Grid>
          <Grid item md={4} sm={12} xs={12} sx={{
            paddingTop: {
              xs: "0px !important",
              sm: "32px !important",
              md: "32px"
            }
          }} >
            {!isMobile && 
              <Box className="show-on-medium-and-up hide-on-med-and-down" sx={{
                height: "325px", borderRadius: "16px", padding: "10px", border: "1px solid #E5E5E5", display: {
                  md: "block",
                  sm: "none",
                  xs: "none"
                }
              }}>
                <Box sx={{

                }}>
                  <AdSense width="500px" height="250px" />
                </Box>
              </Box>
            }
            <Box sx={{
              display: {
                md: "none",
                sm: "flex",
                xs: "flex"
              },
              position: {
                md: "relative",
                sm: "fixed",
                xs: "fixed"
              },
              bottom: {
                md: "",
                sm: "54px",
                xs: "54px"
              },
              left: {
                md: "",
                sm: "0",
                xs: "0"
              },
              width: {
                md: "auto",
                sm: "-webkit-fill-available",
                xs: "-webkit-fill-available"
              },
              justifyContent: "center",
              marginBottom: "5px",
              background: getBackground(progress),
              backgroundSize: '100% 200%',
              backgroundPosition: 'bottom',
              animation: animationTrigger ? `${bottomToTop} 1s forwards` : 'none',
              transition: 'background 1s',// Smooth transition effect
            }}

            >
              <Box sx={{
                animation: `${bounce} 1s infinite`, // Infinite bouncing animation

              }}
              // ref={boxRef}
              // onMouseDown={handleMouseDown}
              // onTouchStart={handleTouchStart}

              >
                {swipingDirection == 'Swiping down' ? <FaAngleDoubleDown style={
                  progress === 3
                    ? { color: "rgba(232, 215, 124, 1)" }
                    : progress === 2
                      ? { color: "rgba(222, 179, 255, 1)" }
                      : { color: "rgba(255, 179, 209, 1)" }
                } /> : <FaAngleDoubleUp
                  style={
                    progress === 3
                      ? { color: "rgba(232, 215, 124, 1)" }
                      : progress === 2
                        ? { color: "rgba(222, 179, 255, 1)" }
                        : { color: "rgba(255, 179, 209, 1)" }
                  }

                />}

              </Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
      <InnerBox
        sx={progress === 3
          ? {
            padding: {
              md: "10px 25px",
              sm: "20px 25px",
              xs: "20px 25px"
            },
            position: {
              md: "fixed",
              sm: "fixed",
              xs: "fixed"
            },
            bottom: {
              md: "0",
              sm: "0",
              xs: "0"
            },
            width: {
              md: "100%",
              sm: "-webkit-fill-available",
              xs: "-webkit-fill-available"
            },
            alignItems: "center",

            background: "rgba(232, 215, 124, 1)",
          } : progress === 2 ? {
            padding: {
              md: "10px 25px",
              sm: "20px 25px",
              xs: "20px 25px"
            },
            position: {
              md: "fixed",
              sm: "fixed",
              xs: "fixed"
            },
            bottom: {
              md: "0",
              sm: "0",
              xs: "0"
            },
            width: {
              md: "100%",
              sm: "-webkit-fill-available",
              xs: "-webkit-fill-available"
            },
            alignItems: "center",
            background: "rgba(222, 179, 255, 1)"
          } : {
            padding: {
              md: "10px 25px",
              sm: "20px 25px",
              xs: "20px 25px"
            },
            position: {
              md: "fixed",
              sm: "fixed",
              xs: "fixed"
            },
            bottom: {
              md: "0",
              sm: "0",
              xs: "0"
            },
            width: {
              md: "100%",
              sm: "-webkit-fill-available",
              xs: "-webkit-fill-available"
            },
            alignItems: "center",
            background: "rgba(255, 179, 209, 1)",
          }}
        // ref={boxRef}
        // onMouseDown={handleMouseDown}
        // onTouchStart={handleTouchStart}
        style={swipingDirection == "Swiping up" ? {
          height: "115px",
          transition: "all 0.1s ease-in-out",
          // borderTopLeftRadius: "50%",
          // borderTop: "14px solid rgb(255, 179, 209)",
          // borderTopRightRadius: "50%"
        } : swipingDirection == "Swiping down" ? {
          height: "35px",
          transition: "all 0.1s ease-in-out",
        } : {}
        }
      >
        {isMobileChild &&
          <Box sx={style.logoBox} style={{
            position: "fixed",
            bottom: "117px",
            left: "16px",
            height: "max-content"
          }}>
            <Box
              sx={{ display: "flex", alignItems: "start", gap: "15px" }}
            >
              {User?.profile?.schoolLogo &&
                <SchoolLogo alt="#" src={User?.profile?.schoolLogo} />}
              <Box>

                {User?.profile?.schoolName &&
                  <Typography variant="body2">
                    {User?.profile?.schoolName}
                  </Typography>}
                {User?.profile?.schoolAddress && <Typography variant="body2">{User?.profile?.schoolAddress}</Typography>}
              </Box>
            </Box>
          </Box>}
        <Container style={{ padding: "0" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={8} sx={{ alignItems: "center", display: "grid" }}>
              <Box>


                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}

                >
                  <CustomLinearProgress
                    variant="determinate"
                    value={calculateProgressValue()}
                  />
                  <Typography variant="body2" color={"#fff"}>
                    {progress}/{max}
                  </Typography>
                </Box>
                {isMobileChild &&
                  <Box
                    {...handlers}
                    sx={{
                      width: '100%',
                      height: '100vh',
                      position: 'fixed',
                      cursor: 'pointer',
                      top: "125px",
                      left: "0"
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: '100%',
                        // height: '40px',
                        backgroundColor: 'blue',
                        borderRadius: '50%',
                      }}
                    />
                  </Box>}
              </Box>
            </Grid>
            <Grid item md={4} sx={{
              display: {
                md: "block",
                sm: "none",
                xs: "none"
              }
            }}>
              <Box sx={{
                display: "flex",
                justifyContent: "end",
                gap: "8px",
              }}>
                <IoChevronBackCircle
                  onClick={() => { decreaseProgress(); swipeUp() }}
                  disabled={progress <= min}
                  color="rgba(255, 255, 255, 1)"
                  fontSize={"48px"}
                  cursor={"pointer"}
                />

                <IoChevronForwardCircle
                  onClick={() => {
                    stopSpeak();
                    swipeUp()
                    if (max == 0) {

                    } else {
                      increaseProgress();
                      if (progress === max) {
                        navigate("/take-quiz", {
                          state: {
                            module_id: location?.state?.level_id,
                            level_id: location?.state?.module_id,
                          },
                        });
                      }

                    }
                  }}
                  disabled={progress >= max}
                  color="rgba(255, 255, 255, 1)"
                  fontSize={"48px"}
                  cursor={"pointer"}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </InnerBox>
      {isLogout && (
        <Dialog
          maxWidth="sm"
          fullWidth
          sx={style.lightDailogOpen

          }
          open={isLogout}
          onClose={() => setIsLogout(false)}
        >
          <DialogContent>
            <Box sx={style.dialougTitle} align="center">
              <Typography
                variant="h3"
              >
                Share this link on social media:
              </Typography>
            
            </Box>
          </DialogContent>
          <DialogActions
            style={{
              display: "block",
            }}
          >
            <Box
              mt={2}
              sx={{display:"flex", gap:"8px", justifyContent:"space-between"}}
            >
              <Button className="whatsapp"
                style={{ display: 'flex', alignItems: 'center' }}
              >
              <WhatsappShareButton
                  url={`https://thecocoapp.com/shared-leason?level_id=${leasonData[progress - 1]?.level_id}&id=${leasonData[progress - 1]?._id}&number=${progress}`}
                  style={{ display: 'flex', alignItems: 'center' }}
                  description={"Check this out"}
              >
                  <FaWhatsapp />
                  &nbsp;<Typography variant="body2" >Whatsapp</Typography>  
              </WhatsappShareButton>
              </Button>
              {/* <Button
                className="google"
                onClick={() => shareOnInstagram(props.code)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <FaInstagram style={{ width: '25px', height: '25px' }} />
                &nbsp; Instagram
              </Button> */}
              <Button className="emailButton"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <FacebookShareButton
                  url={`https://thecocoapp.com/shared-leason?level_id=${leasonData[progress - 1]?.level_id}&id=${leasonData[progress - 1]?._id}&number=${progress}`}
                  style={{ display: 'flex', alignItems: 'center' }}
                  description={"Check this out"}
                >
                  <FaFacebookF style={{ width: '25px', height: '25px' }} />
                  &nbsp;<Typography variant="body2" >Facebook</Typography> 
                </FacebookShareButton>
              </Button>
              
               <CopyToClipboard
                text={`https://thecocoapp.com/shared-leason?level_id=${leasonData[progress - 1]?.level_id}&id=${leasonData[progress - 1]?._id}&number=${progress}`}
                onCopy={() => toast.success("Link copied to clipboard!")}
              ><Button className="google">
               
                  {" Copy Link"}
               
              </Button> 
              </CopyToClipboard>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </MainBox>


  );
}

export default Leason;
