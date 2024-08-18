import ApiConfig from "src/config/APICongig";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function AuthProvider(props) {
  const [profile, setProfile] = useState({});
const [callApi, setCallApi] =useState(false);
  const navigate = useNavigate();
  const [childOpen, setChildOpen] = useState(false);
  const getViewMyProfile = async (values) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getProfile,
        headers: { token: token },
      });
      if (res.status === 200) {
        setProfile(res.data.data);
      }
    } catch (error) {
      if (error?.response?.status === 419 || error?.response?.status === 401 || error?.response?.status === 440 ){
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login")
      }
      console.log(error, "error");
      
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("token") && window.location.pathname !== "/" && window.location.pathname !== "/leason-share") {
      getViewMyProfile();
    }
  }, [window.location.pathname]);

  let data = {
    profile,
    getViewMyProfile: () => getViewMyProfile(),
    callApi,
    setCallApi,
    childOpen,
    setChildOpen
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
