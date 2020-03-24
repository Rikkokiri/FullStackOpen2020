import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='name'>Name</label>
          <input id='name'
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor='number'>number:</label>
          <input id='number'
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App