import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Notification from './notification'
import ShowCountryList from './showCountryList'
import weatherService from './services/weather'
import WeatherInfo from './weatherInfo'

const App = () => {

  const [countrys, setNewCountrys] = useState([])
  const [countryFilter, setNewCountryFilter] = useState('')
  const [message, setMessage] = useState({text: '', isError: false})
  const [weatherData, setNewWeatherData] = useState(null)
  const [city, setNewCity] = useState(null)

  useEffect(() => {
    if (countrys.length === 0){
      countriesService
        .getAll()
        .then(initialCountries => {
          setNewCountrys(initialCountries)
        })
        .catch(error => {
          setMessage({text: `Yhteyttä palvelimeen ei saada`, isError: true})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
        })
    }

      if (city) {
        weatherService
        .getWeather(city)
        .then(newWeatherData => {
          //console.log('setNewWeatherData: ', newWeatherData)
          setNewWeatherData(newWeatherData)
          //console.log('new rendering, weatherData is now: ', weatherData)
        })
        .catch(error => {
          setMessage({text: `Säädataa ei saada haettua`, isError: true})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
        })
      }
  }, [city])

  const handleCountryInputChange = (event) => {
    setNewCountryFilter(event.target.value)
  }

  const handleShowButtonClick = (commonName) => {
    setNewCountryFilter(commonName)
  }

  const filttered = (arr, countryFilter) =>{
    if (countryFilter !== '') {
      //console.log(`Filtter is: ${countryFilter}`)
      const filtteredCountryList = arr.filter((element) => element.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
      if (filtteredCountryList.length === 1 && filtteredCountryList[0].capital !== city){
        setNewCity(filtteredCountryList[0].capital)
        //console.log(`setCity to: ${filtteredCountryList[0].capital}`)
      }
      else if (filtteredCountryList.length > 1 && city !== null){
        setNewCity(null)
        setNewWeatherData(null)
      }
      
      return filtteredCountryList
    }
    return []
  }

  //console.log('App render weather: ', weatherData)
  return (
    <div>
      <Notification message={message.text} isError={message.isError} />
      find countries <input value={countryFilter} onChange={handleCountryInputChange}/>
      <div>
        <ShowCountryList countries={filttered(countrys, countryFilter)} onClickHandle={handleShowButtonClick} />   
      </div>
      <WeatherInfo wdata={weatherData} city={city}/>
    </div>
  )
}

export default App