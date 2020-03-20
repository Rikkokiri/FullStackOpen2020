import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Statistics = ({ good, neutral, bad }) => {
  const count = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / count()
  }

  const positive = () => {
    return good / count() + ' %'
  }

  if (count() > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={count()} />
          <StatisticLine text='Average' value={average()} />
          <StatisticLine text='Positive' value={positive()} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>No feedbacks given</div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick} className='Button'>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => setGood(good + 1)
  const giveNeutralFeedback = () => setNeutral(neutral + 1)
  const giveBadFeedback = () => setBad(bad + 1)

  return (
    <div className='AppContainer'>
      <h1>Give us <br /> feedback...</h1>
      <Button
        handleClick={giveGoodFeedback}
        text='Good' />
      <Button
        handleClick={giveNeutralFeedback}
        text='Neutral' />
      <Button
        handleClick={giveBadFeedback}
        text='Bad' />

      <div className='StatsContainer'>
        <h2>Statistics</h2>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
