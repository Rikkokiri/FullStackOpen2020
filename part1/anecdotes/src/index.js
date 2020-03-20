import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick} className='Button'>{text}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const TopRankeAnecdote = ({ mostVoted, votes }) => {
  if (votes[mostVoted] > 0) {
    return (
      <p>
        {anecdotes[mostVoted]}
        <span className='VoteCount'>It has {votes[mostVoted]} {votes[mostVoted] > 1 ? 'votes' : 'vote'}</span>
      </p>
    )
  } else {
    return (
      <p>No votes have been cast yet.</p>
    )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectRandomIndex = (limit) => {
    return Math.floor(Math.random() * limit)
  }

  const selectAnecdote = (list) => {
    setSelected(selectRandomIndex(list.length))
  }

  const voteForAnecdote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  const indexOfMax = (arr) => {
    let max = arr[0]
    let maxIndex = 0

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i
        max = arr[i]
      }
    }
    return maxIndex
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {props.anecdotes[selected]}
        <span className='VoteCount'>It has {votes[selected]} {votes[selected] > 1 ? ' vote' : ' votes'}</span>
      </p>
      <div>
        <Button
          handleClick={() => voteForAnecdote(selected)}
          text='Vote'
        />
        <Button
          handleClick={() => selectAnecdote(anecdotes)}
          text='Next anecdote'
        />
      </div>
      <h2>Anecdote with most votes</h2>
      <TopRankeAnecdote mostVoted={indexOfMax(votes)} votes={votes} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
