import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <h1>App</h1>

      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
};

export default App;
