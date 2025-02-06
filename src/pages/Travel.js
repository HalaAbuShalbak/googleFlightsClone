import React, { useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getFlightsByDestination } from "../services/redux/flightSlice";
import dayjs from "dayjs";
const Travel = () => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returningDate, setReturningDate] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [originSkyID, setOriginSkyID] = useState("");
  const [destinationSkyID, setDestinationSkyID] = useState("");
  const [originEnityty, setOriginEnityty] = useState("");
  const [destinationEntityId, setDestinationEntityId] = useState("");
  const [success, setSuccess] = useState(false)
  const [msg, setMsg] = useState(false)

const KEY = process.env.REACT_APP_API_KEY;
const dispatch = useDispatch()
  const [data, setData] = useState({
    originSkyId: originSkyID,
    destinationSkyId: destinationSkyID,
    originEntityId: originEnityty,
    destinationEntityId: destinationEntityId,
    date:departureDate,
    returnDate:returningDate,
    cabinClass: "economy",
    adults: adultCount,
    sortBy: 'best',
    currency: "USD",
    market: "en-US",
    countryCode: "US",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getFlight()
    console.log(data);
  };

  // Function to handle + and - button clicks
  const handleCounterChange = (type, action) => {
    switch (type) {
      case "adult":
        setData((prevData) => ({
          ...prevData,
          adults: Math.max(1, prevData.adults + action),
        }));

        break;
      case "child":
        setChildCount((prev) => Math.max(0, prev + action));
        break;
      case "infant":
        setInfantCount((prev) => Math.max(0, prev + action));
        break;
      default:
        break;
    }
  };

  const { airports } = useSelector((state) => state.flight);
  const{flightsByDes}=useSelector((state)=>state.flight)
  const handleCityInputChange = (event) => {
    const userInput = event.target.value.toUpperCase();
    const matchedAirport = airports.filter((e) =>
      userInput.includes(e.navigation.relevantFlightParams.skyId)
    );
    if (matchedAirport.length > 0) {
      if (event.target.name === "To") {
        console.log(matchedAirport[0].navigation.relevantFlightParams.skyId);
        setData((prevData) => ({
          ...prevData,
          originSkyId: matchedAirport[0].navigation.relevantFlightParams.skyId,
          originEntityId:
            matchedAirport[0].navigation.relevantFlightParams.entityId,
        }));
        // setDestinationSkyID(matchedAirport[0].navigation.relevantFlightParams.skyId);

        // setDestinationEntityId(matchedAirport[0].navigation.relevantFlightParams.entityId);
      }
      if (event.target.name === "From") {
        setData((prevData) => ({
          ...prevData,
          destinationSkyId:
            matchedAirport[0].navigation.relevantFlightParams.skyId,
          destinationEntityId:
            matchedAirport[0].navigation.relevantFlightParams.entityId,
        }));
      }
    }
  };

  const getFlight = async () => {
    /* 
    In order to use the search flight API i will have to get the params data from other APIS saved states
    originSkyId = airport.navigation.relevantFlightParams.skyId
    destinationSkyId = airport.navigation.relevantFlightParams.skyId
    originEntityId=airport.navigation.relevantFlightParams.entityId
destinationEntityId=airport.navigation.relevantFlightParams.entityId
sort options = [{best : Best},{price_high : Cheapest },{fastest : Fastest}]
cabinClass =[{economy: Economy},{premium_economy: Premium Economy},{business: Business},{first: First}]
    */

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights",
      params: data,
      headers: {
        "x-rapidapi-key": KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
dispatch(flightsByDes(response.data.data))
if(response.data.data.context.status){
  setSuccess(true)
  setMsg(true)

}

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Flight Search
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* From */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="From"
              name="From"
              fullWidth
              onChange={(e) => {
                handleCityInputChange(e);
              }}
              required
            />
          </Grid>

          {/* To */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="To"
              name="To"
              fullWidth
              onChange={(e) => {
                handleCityInputChange(e);
              }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Departure Date"
                value={dayjs(departureDate)}
                onChange={(newDate) =>{
                  setData((prevData) => ({
                    ...prevData,date:dayjs(newDate).format("YYYY-MM-DD")
                  
                  }))}
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          {/* returning */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Returning Date"
                // value={dayjs(returningDate)}
                onChange={(newDate) =>{
                  setData((prevData) => ({
                    ...prevData,returnDate:dayjs(newDate).format("YYYY-MM-DD")|| null
                  
                  }))}
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Adults Counter */}
          <Grid item xs={12} sm={4}>
            <Typography>Adults</Typography>
            <Button onClick={() => handleCounterChange("adult", -1)}>-</Button>
            <Typography component="span" sx={{ margin: "0 10px" }}>
              {adultCount}
            </Typography>
            <Button onClick={() => handleCounterChange("adult", 1)}>+</Button>
          </Grid>

          {/* Children Counter */}
          <Grid item xs={12} sm={4}>
            <Typography>Children</Typography>
            <Button onClick={() => handleCounterChange("child", -1)}>-</Button>
            <Typography component="span" sx={{ margin: "0 10px" }}>
              {childCount}
            </Typography>
            <Button onClick={() => handleCounterChange("child", 1)}>+</Button>
          </Grid>

          {/* Infants Counter */}
          <Grid item xs={12} sm={4}>
            <Typography>Infants</Typography>
            <Button onClick={() => handleCounterChange("infant", -1)}>-</Button>
            <Typography component="span" sx={{ margin: "0 10px" }}>
              {infantCount}
            </Typography>
            <Button onClick={() => handleCounterChange("infant", 1)}>+</Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography>
        {msg&&!success? <>Sorry , We couldn't Find you a flight!</> :<></>}
      </Typography>
    </Box>
  );
};

export default Travel;
