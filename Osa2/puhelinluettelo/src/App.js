import { useState, useEffect } from 'react'
import PersonInput from "./PersonInput"
import ShowPerson from './ShowPerson'
import Filter from './Filter'
import personService from './services/persons'
import Notification from './notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({text: '', isError: false})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) // Tyhjä taulukko viimeisenä parametrinä merkitsee, että useEffect funktio
  // kutsutaan vain kerran kun komponentti rendereoidaan ensimmäisen kerran.

  //console.log(`render ${persons.length} persons`)

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChahge = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
    //console.log(`Filtteröinti` + filttered(persons, newFilter))
  }

  const handleDeleteClick = (id) => {
    //console.log('Delete: ', id)

    // personService.deletePerson palauttaa promisen
    // Kun haluamme promisea vastaavan operaation tuloksen, tulee promiselle
    // rekisteröidä tapahtumankuuntelija. Tämä tapahtuu metodilla then.
    // JS suoritusympäristö kutsuu then-metodin avulla rekisteröityä takaisinkutsufunktiota
    // antaen sille paramitriksi olion response, joka sisältää kaiken oleellisen HTTP-pyynnön
    // vastaukseen liittyvän tiedon.
    // !!! Sille ei siis voi itse määrittää haluamaansa parametriä.
    const findResult = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${findResult.name} ?`))
    {
      personService
        .deletePerson(id)
        .then(response => {
          //console.log('Person deleted and setPersons call')
          setPersons(persons.filter(person => person.id !== id))
          setMessage({text: `${findResult.name} deleted`, isError: false})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
        })
        .catch(error => {
          //alert(`the person '${findResult.name}' was already deleted from server`)
          setPersons(persons.filter(p => p.id !== findResult.id))
          setMessage({text: `the person ${findResult.name}  was already deleted from server`, isError: true})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
        })
    }
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
        if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
          personService
            .update(element.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== element.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
        }
        return true
      }
      else
        return false
    }))
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({text: `Added ${newName}`, isError: false})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
      })
  }

  const filttered = (arr, filter) =>{
    if (filter !== '')
      return arr.filter((element) => element.name.toLowerCase().includes(filter.toLowerCase()))
    
    return arr
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} isError={message.isError} />
      <Filter newFilter={newFilter} handleFilterInputChange={handleFilterInputChange} />
      <PersonInput 
        newName={newName} 
        newNumber={newNumber} 
        handleNameInputChange={handleNameInputChange} 
        handleNumberInputChahge={handleNumberInputChahge} 
        onClickHandle={addNewName}/>
      <h2>Numbers</h2>
      {filttered(persons, newFilter).map(person => 
        <ShowPerson 
          key={person.name} 
          person={person}  
          onClickHandle={() => handleDeleteClick(person.id)}
        />
      )}
    </div>
  )

}

export default App
