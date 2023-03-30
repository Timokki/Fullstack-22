import axios from 'axios'
const weatherApi= process.env.REACT_APP_WEATHER_API
const weatherDomain= process.env.REACT_APP_WEATHER_DOMAIN

//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2af71faca261ccbca9792194dc3900d0

const getWeather = (city) => {
  //console.log(`getWeather city: ${city}`)
  const request = axios.get(`${weatherDomain}weather?q=${city}&appid=${weatherApi}`)
  return request.then(response => response.data)
}

export default {getWeather}