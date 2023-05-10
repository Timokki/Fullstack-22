require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const persons = []

morgan.token('body', req => {
  return JSON.stringify(req.body)
} )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
  /*if (person){
    res.json(person)
  } else {
    res.status(404).end()
  } */
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
  const body = req.body
  //console.log('body: ', person)
  if (!person){return res.status(400).json({error: 'content missing'})}
  if (person.name === ''){return res.status(400).json({error: 'name missing'})}
  if (person.number === ''){return res.status(400).json({error: 'number missing'})} 
  //if (persons.find(p => p.name === person.name)){return res.status(400).json({error: 'name must be unique'})}
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(pers => pers.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})