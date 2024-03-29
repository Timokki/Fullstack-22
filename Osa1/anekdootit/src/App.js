import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(7).fill(0))

  const voteHandleClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={voteHandleClick} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 7))} text="next anectode" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(Math.max.apply(Math, votes))]} <br />
      has {Math.max.apply(Math, votes)} votes
    </div>
  )
}

export default App
