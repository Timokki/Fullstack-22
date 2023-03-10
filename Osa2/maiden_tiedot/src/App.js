import { useState, useEffect } from 'react'

function App() {
  const [country, setNewCountry] = useState('')

  const handleCountryInputChange = (event) => {
    setNewCountry(event.target.value)
  }

  return (
   <div>
    find countries <input value={country} onChange={handleCountryInputChange}/>
   </div>
  )
}

export default App;