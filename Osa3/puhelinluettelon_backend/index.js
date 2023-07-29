require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


morgan.token('body', req => {
  return JSON.stringify(req.body)
} )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log("ErrorHandler Validation Error")
    return res.status(400).json({error: error.message})
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res) => {
  Person.find({})
  .then(persons => {res.json(persons)})
  .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {res.json(person)})
  .catch(error => next(error))
})

app.get('/info', (req, res) => {
  reqTime = Date.now()
  Person.find({})
  .then(persons => {
    res.send(
      `Phonebook has info for ${persons.length} people
      <br /><br />
      ${Date(reqTime)}
      `
    )
  })
  .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) =>{
  const body = req.body
  console.log('body: ', body.name, body.number)
  //if (!body){return res.status(400).json({error: 'content missing'})}
  //if (body.name === ''){return res.status(400).json({error: 'name missing'})}
  //if (body.number === ''){return res.status(400).json({error: 'number missing'})} 
  //if (persons.find(p => p.name === body.name)){return res.status(400).json({error: 'name must be unique'})}
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
  .then(savedPerson => {
    res.json(savedPerson)
    console.log('response.data:', savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) =>{
  const {name, number} = req.body

  Person.findByIdAndUpdate(req.params.id, 
    {name, number},
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {res.status(204).end()})
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler) //muista pitää tämä viimeisenä middleware rekisteröintinä

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})