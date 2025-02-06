import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyAirports } from "../services/redux/flightSlice";
import Box from "@mui/material/Box";

const KEY = process.env.REACT_APP_API_KEY;

let longitude;
let latitude;
// ---------------- get longitude and latitude from user browser
navigator.geolocation.getCurrentPosition(function (location) {
  longitude = location.coords.latitude;
  latitude = location.coords.longitude;
});
const NearbyAirPorts = () => {
  const dispatch = useDispatch();

  // ----------------- Stepper states
  const [currentIndex, setCurrentIndex] = useState(0);

  const { airports } = useSelector((state) => state.flight);
  console.log(airports);
  const getAirports = () => {
    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports",
      params: {
        lat: latitude,
        lng: longitude,
        locale: "en-US",
      },
      headers: {
        "x-rapidapi-key": KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((result) => {
        // setSteps(result.data.data.nearby);
        dispatch(getNearbyAirports(result.data.data.nearby));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ------------- use Effect
  useEffect(() => {
    // getAirports()
    if (airports.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % airports.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [airports]);

  return (
    <Box sx={{ width: "91%", height: "100%", margin: "auto" }}>
      {airports.length > 0 && (
        <>
          <h3>What are you waiting for ? There's a lot missing you !</h3>
          <h3>Waiting for you in.. </h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "skyblue",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ flex: "1 1 1" }} />
            <h3
              style={{
                borderRadius: "10px",
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              {airports[currentIndex]?.presentation.subtitle}
            </h3>
            <h3
              style={{
                borderRadius: "10px",
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              {airports[currentIndex]?.presentation.suggestionTitle}{" "}
            </h3>
            <h3
              style={{
                borderRadius: "10px",
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              {airports[currentIndex]?.navigation.suggestionTitle}{" "}
            </h3>
          </Box>
        </>
      )}
    </Box>
  );
};

export default NearbyAirPorts;
