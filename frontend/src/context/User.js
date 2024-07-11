import ApiConfig from "src/config/APICongig";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function AuthProvider(props) {
  const [profile, setProfile] = useState({});

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
      console.log(error, "error");
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("token") && window.location.pathname !== "/") {
      getViewMyProfile();
    }
  }, []);

  let data = {
    profile,
    getViewMyProfile: () => getViewMyProfile(),
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
