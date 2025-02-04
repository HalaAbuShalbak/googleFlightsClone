import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Component1 from "./components/Component1";
const App = () => {
  return (
    <>
      <h1>App</h1>

      <Routes>
        <Route path="/" element={<Component1 />} />
      </Routes>
    </>
  );
};

export default App;
