import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contactsService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    contactsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      if (window.confirm(`Name '${newName}' is already in the phonebook. Replace the old number with new one?`)) {
        updateNumber(newName)
      }
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

      contactsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewNumber('')
        })
    }
  }

  const updateNumber = (name) => {
    const person = persons.find(p => p.name.toLowerCase() === name.toLowerCase())
    const changedPerson = { ...person, number: newNumber }

    contactsService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
      .catch(error => {
        console.log(error)
        window.alert('An error occurred and update action failed.')
      })
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      contactsService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          console.log(error)
          window.alert(`The contact '${person.name} was already deleted from server.'`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
