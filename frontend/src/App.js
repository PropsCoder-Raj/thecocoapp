import React from "react";
import {  CssBaseline } from "@mui/material";
import AppRouter from "./AppRouter";
import { Toaster } from 'react-hot-toast';

function App() {
  const handleCopy = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };
  return (
    <div className="App"
      onCopy={handleCopy}
      onPaste={handlePaste}
    >
      <div>
        <Toaster 
        position="bottom-right"
        reverseOrder={false} />
        <CssBaseline />
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
