import axios from 'axios'
const weatherApi= process.env.REACT_APP_WEATHER_API
const weatherDomain= process.env.REACT_APP_WEATHER_DOMAIN

const getWeather = (city) => {
  //console.log(`getWeather city: ${city}`)
  const request = axios.get(`${weatherDomain}weather?q=${city}&appid=${weatherApi}`)
  return request.then(response => response.data)
}

export default {getWeather}