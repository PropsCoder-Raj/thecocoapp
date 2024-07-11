import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function redirectToMail(email) {
  window.location.href = `mailto:${email}`;
}

export function usePreviousPathname (){
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return previousLocation.current.pathname;
};

export function handleSpeak(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support text-to-speech.");
  }
};

// Function to generate labels A, B, C, ...
export function  generateLabels(length){
  const labels = [];
  for (let i = 0; i < length; i++) {
    let label = '';
    let number = i;
    do {
      label = String.fromCharCode((number % 26) + 65) + label;
      number = Math.floor(number / 26) - 1;
    } while (number >= 0);
    labels.push(label);
  }
  return labels;
};

export const getImageUrl = async (values) => {

  const token = localStorage.getItem("token")
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig.photo,
      headers: { token: token },
      data: {
        photo: values,
      }
    });


    if (res.status === 200) {
      return 
    }
  } catch (error) {
    return ""
    
  }
};