import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const Travel = () => {  
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returningDate, setReturningDate] = useState(dayjs());

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [stopCount, setStopCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "from":
        setFrom(value);
        break;
      case "to":
        setTo(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      from,
      to,
      adultCount,
      childCount,
      infantCount,
      stopCount,
    });
  };

  // Function to handle + and - button clicks
  const handleCounterChange = (type, action) => {
    switch (type) {
      case "adult":
        setAdultCount((prev) => Math.max(1, prev + action));
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

  return (
    <Box sx={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Flight Search
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} >
          {/* From */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="From"
              fullWidth
              name="from"
              value={from}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* To */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="To"
              fullWidth
              name="to"
              value={to}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Departure Date"
                value={departureDate}
                onChange={(newDate) => setDepartureDate(newDate)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider> 
          </Grid>

             {/* returning */}
             <Grid item xs={12} sm={6} >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Returning Date"
                value={returningDate}
                onChange={(newDate) => setReturningDate(newDate)}
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
    </Box>
  );
 
}

export default Travel
