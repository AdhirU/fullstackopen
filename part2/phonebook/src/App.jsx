import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterToken, setNewfilterToken] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    let existingPerson = persons.find(person => person.name == newName)
    if (existingPerson === undefined) {
      // Creating new person
      personsService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showMessage(`Added ${returnedPerson.name}`, false) 
    })
    } else {
      // Updating existing person
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        newPerson.id = existingPerson.id
        personsService.update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            showMessage(`Updated phone number for ${returnedPerson.name}`, false)
          })
          .catch(error => {
            showMessage(`Information of ${newName} has already been removed from server`, true)
            setPersons(persons.filter(person => person.id !== newPerson.id))
          })
      }
    }
    
    setNewName('')
    setNewNumber('')
  }

  const showMessage = (msg, error) => {
    setMessage({msg, error})
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const filteredPersons = persons.filter(person => (
    person.name.toLowerCase().includes(filterToken.toLowerCase()))
  )

  const handleFilterChange = (event) => {
    setNewfilterToken(event.target.value)
  }

  const deletePersonById = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== res.id))
          showMessage(`Deleted ${res.name}`, false)
        })
    }
  }

  return (
    <div>
      <h2 className='header'>Phonebook</h2>
      <Notification message={message} />
      <Filter 
        handleFilterChange={handleFilterChange} 
        filterToken={filterToken}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        filteredPersons={filteredPersons} 
        deletePersonById={deletePersonById}
      />
    </div>
  )
}

export default App
