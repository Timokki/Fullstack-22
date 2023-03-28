import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import ShowCountry from './showCountry'
import Notification from './notification'
import ShowCountryList from './showCountryList'

const App = () => {
  const [countrys, setNewCountrys] = useState([])
  const [countryFilter, setNewCountryFilter] = useState('')
  const [message, setMessage] = useState({text: '', isError: false})

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setNewCountrys(initialCountries)
      })
      .catch(error => {
        //alert(`the person '${findResult.name}' was already deleted from server`)
        setMessage({text: `Yhteyttä palvelimeen ei saada`, isError: true})
        setTimeout(() => {
        setMessage({text: ``, isError: false})
        }, 3000)
      })
  }, [])

  const handleCountryInputChange = (event) => {
    setNewCountryFilter(event.target.value)
  }

  const handleShowButtonClick = (commonName) => {
    setNewCountryFilter(commonName)
  }

  const filttered = (arr, countryFilter) =>{
    if (countryFilter !== '') {
      console.log(`Filtter is: ${countryFilter}`)
      return arr.filter((element) => element.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    }
    return []
  }

  return (
    <div>
      <Notification message={message.text} isError={message.isError} />
      find countries <input value={countryFilter} onChange={handleCountryInputChange}/>
      <div>
        <ShowCountryList countries={filttered(countrys, countryFilter)} onClickHandle={handleShowButtonClick}/>   
      </div>
    </div>
  )
}

export default App