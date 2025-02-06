import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Travel from "./pages/Travel";

const App = () => {
  return (
    <>
    <Navbar/>

       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Travel" element={<Travel/>} />

      </Routes>
    </>
  );
};

export default App;
