import React from 'react'

const CountryList = ({ query, countries, showButtonHandler }) => {
  if (query !== '' && countries.length >= 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <ul className='countrylist'>
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
