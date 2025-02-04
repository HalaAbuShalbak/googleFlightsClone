import { createSlice } from "@reduxjs/toolkit";

export const flightSlice = createSlice({
  name: "flight",
  initialState: {
    allFlights: [],
  },
  reducers: {
    getAllFlights: (state, action) => {
      state.allFlights.push(action.payload);
    },
  },
});
export const { getAllFlights } = flightSlice.actions;
export default flightSlice.reducer;
