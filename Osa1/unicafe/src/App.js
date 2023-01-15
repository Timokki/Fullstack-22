import { useState } from "react"

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StaticsTable = ({good, neutral, bad}) => {
  if (good > 0 || neutral > 0 || bad > 0){
    return (
      <table>
        <tbody>
          <StaticTableRow text='Good' value={good} />
          <StaticTableRow text='Neutral' value={neutral} />
          <StaticTableRow text='Bad' value={bad} />
          <StaticTableRow text='All' value={good + neutral + bad} />
          <StaticTableRow text='Average' value={(good - bad)/(bad + neutral + good)} />
          <StaticTableRow text='Positive' value={(good / (bad + neutral + good))*100} />
        </tbody>
      </table>
    )
  }
}

const StaticTableRow = (props) => {
  if (props.text === "Positive")
    return(
      <tr>
      <td>{props.text}</td>
      <td>{props.value} %</td>
    </tr>
    ) 
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <br/>
      <h1>statistics</h1>
      <StaticsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App