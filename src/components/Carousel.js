import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlights } from "../services/redux/flightSlice";
const KEY = process.env.REACT_APP_API_KEY;
const Carousel = () => {
  const dispatch = useDispatch();
  const { allFlights } = useSelector((state) => state.flight);
  // const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(allFlights)

  const getFlights = () => {
    console.log("imworking")
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
        "x-rapidapi-key": KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((result) => {
        dispatch(getAllFlights(result.data.data.results));
        // getPictures(result.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
    const images = allFlights.map((e) => e?.content?.image?.url).filter(Boolean);
   


  useEffect(() => {
    // getFlights();
    if (allFlights.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [allFlights]);

  return (
    <Box sx={{ width: "100%" }}>
      {images.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "center",
            }}
          >
            <Box sx={{ flex: "1 1 1" }} />
            <img
              src={images[currentIndex]}
              alt={`Flight step ${currentIndex + 1}`}
              style={{
                borderRadius: "10px",
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
export default Carousel;


