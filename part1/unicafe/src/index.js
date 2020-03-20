import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// import './index.css'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const count = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / count()
  }

  if (count() > 0) {
    return (
      <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {count()}</p>
        <p>Average {average()}</p>
        <p>Positive {good / count()} %</p>
      </div>
    )
  } else {
    return (
      <div>No feedbacks given</div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => setGood(good + 1)
  const giveNeutralFeedback = () => setNeutral(neutral + 1)
  const giveBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give us feedback!</h1>
      <Button
        handleClick={giveGoodFeedback}
        text='good' />
      <Button
        handleClick={giveNeutralFeedback}
        text='neutral' />
      <Button
        handleClick={giveBadFeedback}
        text='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
