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



export function handleSpeak(text, options = {}, onEnd) {
  let utterance
  if ("speechSynthesis" in window) {
    if (utterance) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
    }
    utterance = new SpeechSynthesisUtterance(text);

    // Set custom options if provided
    if (options.voice) utterance.voice = options.voice;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.volume !== undefined) utterance.volume = options.volume;

    // Add event listener for the end of speech
    utterance.onend = onEnd;

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support text-to-speech.");
  }
}
export function stopSpeak() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
// Fetch available voices and set a sweet female default, fallback to kid-friendly, then default
export function getVoice() {
  const voices = window.speechSynthesis.getVoices();
  const sweetFemaleVoice = voices.find(voice => voice.name.includes("Google US English") && voice.gender === "female");
  if (sweetFemaleVoice) return sweetFemaleVoice;

  const kidFriendlyVoice = voices.find(voice => voice.name.includes("Google US English"));
  if (kidFriendlyVoice) return kidFriendlyVoice;

  return voices[0]; // Fallback to the first available voice
}
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