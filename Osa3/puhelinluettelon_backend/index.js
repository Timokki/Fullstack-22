const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
} )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
  } else if (person.name === ''){
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (person.number === ''){
    return res.status(400).json({
      error: 'number missing'
    })
  } else if (persons.find(p => p.name === person.name)){
    return res.status(400).json({
      error: 'name must be unique'
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