import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { getAllFlights } from "../services/redux/flightSlice";

const Carousel = () => {
  const dispatch = useDispatch();
  const { allFlights } = useSelector((state) => state.flight);
  const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPictures = (res) => {
    const images = res.map((e) => e?.content?.image?.url).filter(Boolean);
    setSteps(images);
  };

  const getFlights = () => {
    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere",
      params: {
        originEntityId: "95673320",
        cabinClass: "economy",
        journeyType: "one_way",
        currency: "USD",
      },
      headers: {
        "x-rapidapi-key": "ca75978383msh5a89fe80bf1e379p125fc1jsncf7a79aed27a",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((result) => {
        dispatch(getAllFlights(result.data.data.results));
        getPictures(result.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFlights()
    if (steps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval); 
  }, [steps]);
  return (
    <Box sx={{ width: "100%" }}>
    
      {steps.length > 0 && (
        <React.Fragment>
        
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 ,justifyContent:"center"}}>
            <Box sx={{ flex: "1 1 1" }} />
            <img
          src={steps[currentIndex]}
          alt={`Flight step ${currentIndex + 1}`}
          style={{ borderRadius: "10px", transition: "opacity 0.5s ease-in-out" }}
        />

          </Box>
        </React.Fragment>
      
      )}
    </Box>
  );
};
export default Carousel;
