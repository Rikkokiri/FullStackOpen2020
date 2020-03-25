import React from 'react'
import CountryDetails from './CountryDetails'

const CountryList = ({ query, countries, showButtonHandler }) => {
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
        {countries.map(country => {
          return <li key={country.alpha3Code}>
            {country.name}
            <button onClick={showButtonHandler} value={country.name}>
              Show
            </button>
          </li>
        })}
      </ul>
    )
  }
}

export default CountryList
