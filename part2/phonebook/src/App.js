import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = filterInput === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterInput(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    // If the phone book already includes the name that user tries to add, prevent adding it.
    // (Case insensitive check)
    if (persons.some(p => p.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`Name '${newName}' is already in the phonebook.`)
    } else if (persons.some(p => p.number === newNumber)) {
      window.alert(`The number ${newNumber} is already in the phonebook.`)
    } else if (newName === '' || newNumber === '') {
      window.alert('Both fields need to be filled.')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterValue={filterInput} onChange={handleFilterChange} />
      <h2>Add New Contact</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
