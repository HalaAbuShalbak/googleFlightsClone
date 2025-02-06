import React, { useState } from 'react'
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Button,
  Box
} from '@mui/material';

const Travel = () => {  
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [stopCount, setStopCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'from':
        setFrom(value);
        break;
      case 'to':
        setTo(value);
        break;
      case 'adultCount':
        setAdultCount(value);
        break;
      case 'childCount':
        setChildCount(value);
        break;
      case 'infantCount':
        setInfantCount(value);
        break;
      case 'stopCount':
        setStopCount(value);
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
      stopCount
    });
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Flight Search
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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

          {/* Passengers Type and Number */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Adults</InputLabel>
              <Button>+</Button>
              <Button>-</Button>

             
               
            
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Children</InputLabel>
              <Select
                name="childCount"
                value={childCount}
                onChange={handleInputChange}
                label="Children"
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Infants</InputLabel>
              <Select
                name="infantCount"
                value={infantCount}
                onChange={handleInputChange}
                label="Infants"
              >
                {[...Array(5).keys()].map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Number of Stops */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Stops</InputLabel>
              <Select
                name="stopCount"
                value={stopCount}
                onChange={handleInputChange}
                label="Stops"
              >
                {[...Array(6).keys()].map((i) => (
                  <MenuItem key={i} value={i}>
                    {i === 0 ? 'Direct' : `${i} Stop${i > 1 ? 's' : ''}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
 
}

export default Travel
