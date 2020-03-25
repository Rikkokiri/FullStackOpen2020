import React from 'react'
import CountryDetails from './CountryDetails'

const CountryList = ({ query, countries }) => {
  if (query !== '' && countries.length >= 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  } else {
    return (
      <ul>
        {countries.map(country => <li key={country.alpha3Code}>{country.name}</li>)}
      </ul>
    )
  }
}

export default CountryList
