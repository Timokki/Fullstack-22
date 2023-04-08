const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    res.json(person)
  } else {
    res.status(404).end()
  } 
})

app.get('/info', (req, res) => {
  reqTime = Date.now()
  res.send(
    `Phonebook has info for ${persons.length} people
    <br /><br />
    ${Date(reqTime)}
    `
  )
})

app.post('/api/persons', (req,res) =>{
  person = req.body
  //console.log('body: ', person)
  if (!person){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const newPerson = {
    name: person.name,
    number: person.number,
    id: (Math.random() * 20000).toFixed(0)
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(pers => pers.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})