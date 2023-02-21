import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-123 1244"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChahge = (event) => {
    setNewNumber(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInputChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberInputChahge} /></div>
        <div>
          <button onClick={addNewName} type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <ShowPerson key={person.name} person={person} />)}
    </div>
  )

}

const ShowPerson = ({person}) => {
  return <h4>{person.name} {person.number}</h4>
}

export default App
