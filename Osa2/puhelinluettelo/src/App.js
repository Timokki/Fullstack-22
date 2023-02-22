import { useState, useEffect } from 'react'
import PersonInput from "./PersonInput"
import ShowPerson from './ShowPerson'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChahge = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
    console.log(`Filtteröinti` + filttered(persons, newFilter))
  }

  const addNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.find(element => {
      //console.log("Elemet.name: ", element.name)
      if (element.name === newName){
        window.alert(`${newName} is already added to phonebook`)
        return true
      }
      else
        return false
    }))
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const filttered = (arr, filter) =>{
    if (filter !== '')
      return arr.filter((element) => element.name.toLowerCase().includes(filter.toLowerCase()))
    
    return arr
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterInputChange={handleFilterInputChange} />
      <PersonInput 
        newName={newName} 
        newNumber={newNumber} 
        handleNameInputChange={handleNameInputChange} 
        handleNumberInputChahge={handleNumberInputChahge} 
        onClickHandle={addNewName}/>
      <h2>Numbers</h2>
      {filttered(persons, newFilter).map(person => <ShowPerson key={person.name} person={person} />)}
    </div>
  )

}

export default App
