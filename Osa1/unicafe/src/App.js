import { useState } from "react"

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const StaticsTable = (props) => {
  const {good, neutral, bad} = props

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

  const setToGood = (newValue) => {
    setGood(good + 1)
  }

  const setToNeutral = (newValue) => {
    setNeutral(neutral + 1)
  }
  
  const setToBad = (newValue) => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <br/>
      <h1>statistics</h1>
      <StaticsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App