import axios from "axios";
let longitude;
let latitude;
const Key = process.env.REACT_APP_API_KEY;
const apis = {};
navigator.geolocation.getCurrentPosition(function (location) {
  longitude = location.coords.latitude;
  latitude = location.coords.longitude;
});
apis.getNearbyAirports = () => {
    const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports',
        params: {
          lat: latitude,
          lng: longitude,
          locale: 'en-US'
        },
        headers: {
          'x-rapidapi-key': Key,
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
      };
  axios.request(options)
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
apis.checkServer = () => {
    axios
      .get(
        'https://sky-scrapper.p.rapidapi.com/api/v1/getConfig',{
        headers: {
            'x-rapidapi-key': Key,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
          }}
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

export default apis;
