const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('Anna kaikki tarvittavat argumentit')
  process.exit(1)
}

const passwd = process.argv[2]

const url = `mongodb+srv://fullstack:${passwd}@cluster0.6kjcn.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] != null && process.argv[4] != null){
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}




