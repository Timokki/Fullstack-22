const WeatherInfo = ({wdata, city}) => {
  //console.log(`WeatherData wdata: `, wdata, city)
  if (wdata){
    const weatherConditionIcon = wdata.weather[0].icon
  
    return (
      <div>
        <h2>Weather in {wdata.name}</h2>
        temperature {(-272.15 + wdata.main.temp).toFixed(2)} Celsius <br />
        <img src={`https://openweathermap.org/img/wn/${weatherConditionIcon}@2x.png`} alt={`weather condition icon`} /> 
        <br />
        wind {wdata.wind.speed} m/s
      </div>
    )
  }
  else
    //console.log("Miksi tänne?")
    return 
}

export default WeatherInfo