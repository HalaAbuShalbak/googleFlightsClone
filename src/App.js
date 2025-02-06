import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import Cars from "./pages/Cars";

const App = () => {
  return (
    <>
    <Navbar/>

       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Travel" element={<Travel/>} />
        <Route path="/Cars" element={<Cars/>} />


      </Routes>
    </>
  );
};

export default App;
