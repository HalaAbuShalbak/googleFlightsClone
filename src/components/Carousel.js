import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {useDispatch } from "react-redux";
import { getAllFlights } from "../services/redux/flightSlice";

const Carousel = () => {
  const dispatch = useDispatch();
 
  
  const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

 
  const getFlights = (city) => {
    console.log(process.env.REACT_APP_UNSPLASH_ACCESS_KEY)
    axios.
    get(`https://api.unsplash.com/photos/random?query=${city}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`)
      .then((result) => {
        console.log(result.data.url)
        dispatch(getAllFlights(result.urls.regular)); 
        setSteps(result.urls.regular)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const cities = ['New York', 'Paris', 'Tokyo', 'London', 'Sydney', 'Berlin','Amman','Italy','Fas'];
    cities.forEach(getFlights);

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

// old get request for city images from sky scrapper
// const getFlights = () => {
//   const options = {
//     method: "GET",
//     url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere",
//     params: {
//       originEntityId: "95673320",
//       cabinClass: "economy",
//       journeyType: "one_way",
//       currency: "USD",
//     },
//     headers: {
//       "x-rapidapi-key": "ca75978383msh5a89fe80bf1e379p125fc1jsncf7a79aed27a",
//       "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
//     },
//   };

//   axios
//     .request(options)
//     .then((result) => {
//       dispatch(getAllFlights(result.data.data.results));
//       // getPictures(result.data.data.results);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// const getPictures = () => {
//   //  this was working until the free hits on the API were used 100%
//     //    const images = res.map((e) => e?.content?.image?.url).filter(Boolean);
//     //    setSteps(images)
  
  
//     };