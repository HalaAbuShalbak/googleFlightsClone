import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "../services/redux/xslice";

const Component1 = () => {
  const dispatch = useDispatch();
 
  return (

     <>
     <h1>test</h1>
     </>
  )
};

export default Component1;
