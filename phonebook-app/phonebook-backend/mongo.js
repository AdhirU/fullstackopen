const mongoose = require('mongoose')

let action = null
if (process.argv.length < 3) {
  console.log('Must provide password as command line argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  action = 'list'
} else if (process.argv.length === 5) {
  action = 'add'
} else {
  console.log('You can either list people with args <password> or add new person with args <password> <name> <number>')
  process.exit(1)
}

// Connect to MongoDB database
const password = process.argv[2]

const url = `mongodb+srv://adhiru:${password}@cluster0.ia7me.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define Person Schema and Model
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (action === 'list') {
  // If list - list all people saved
  console.log('phonebook')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (action === 'add') {
  // If add - add new person to the phonebook
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(() => mongoose.connection.close())
}
