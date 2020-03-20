import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  /* setTimeout(
    () => setCounter(counter + 1),
    1000
  ) */

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  const nimi = 'Pekka'
  const ika = 10

  const Display = ({ counter }) => <div>{counter}</div>

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  return (
    <div>
      <h1>Greetings</h1>
      <Display counter={counter} />
      <Button
        handleClick={increaseByOne}
        text='plus' />
      <Button
        handleClick={setToZero}
        text='zero' />
      <Button
        handleClick={decreaseByOne}
        text='minus' />
      <Hello name='Maya' age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
