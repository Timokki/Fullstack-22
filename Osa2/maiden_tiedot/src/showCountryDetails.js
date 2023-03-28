const ShowCountryDetails = ({country}) => {
  //console.log('Languages: ', country.languages)
  const langKeys = Object.keys(country.languages)
  //console.log('Language keys: ', langKeys)
  const flagStyle = {
    width: 150,
    height: 'auto'
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital}<br />
      area {country.area} 
      <h4>languages:</h4>
      <div>
        {langKeys.map((key, i) => <li key={i}> {country.languages[key]} </li>)}
      </div>
      <br />
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} style={flagStyle}></img>
    </div>
  )
}

export default ShowCountryDetails