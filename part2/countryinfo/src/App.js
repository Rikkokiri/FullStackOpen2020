import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [matches, setMatches] = useState([])
  const [query, setQuery] = useState('')

  const hook = () => {
    if (query !== '') {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          const filtered = filterResuls(query, response.data)
          setMatches(filtered)
        })
    } else {
      setMatches([])
    }
  }

  useEffect(hook, [query])

  const filterResuls = (name, countries) => {
    // First check for exact match
    let exactMatch = countries.filter(country => country.name.toLowerCase() === name.toLowerCase())
    if (exactMatch.length >= 1) {
      return exactMatch
    } else {
      // if exact match is not found, then just filter
      return countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    }
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <h1>Country Info</h1>
      <label htmlFor='search'>Find countries</label>
      <input id='search'
        value={query}
        onChange={handleQueryChange}
      />
      <CountryList countries={matches} query={query} />
    </div>
  )
}

export default App
