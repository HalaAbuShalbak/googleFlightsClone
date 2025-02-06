import { createSlice } from "@reduxjs/toolkit";
export const flight = createSlice({
  name: "flights",
  initialState: {
    allFlights:  localStorage.getItem("flightsData")?JSON.parse(localStorage.getItem("flightsData")):[] ,
    airports: localStorage.getItem("airports")?JSON.parse(localStorage.getItem("airports")):[]  ,
    flightsByDes: localStorage.getItem("flightsByDes")?JSON.parse(localStorage.getItem("flightsByDes")):[]  

  },
  reducers: {
    getAllFlights: (state, action) => {
      state.allFlights.push(action.payload);
      localStorage.setItem("flightsData", JSON.stringify(action.payload));
    },
    getNearbyAirports:(state,action)=>{
      state.airports.push(action.payload);
      localStorage.setItem("airports", JSON.stringify(action.payload));
    },
    getFlightsByDestination:(state,action)=>{
      state.flightsByDes.push(action.payload)
      localStorage.setItem("flightsByDes", JSON.stringify(action.payload));

    }
  }
});
export const { getAllFlights,getNearbyAirports,getFlightsByDestination } = flight.actions;
export default flight.reducer;
