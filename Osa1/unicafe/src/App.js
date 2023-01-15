import { useState } from "react"

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const StatisticLine = (props) => {
  if (props.text === "Positive")
    return (
      <>
        {props.text}
        &nbsp;
        {props.value}
        &nbsp; %
        <br />
      </>
    )
    
  return (
    <>
      {props.text}
      &nbsp;
      {props.value}
      <br />
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  if (good > 0 || neutral > 0 || bad > 0){
    return (
      <div>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={good + neutral + bad} />
          <StatisticLine text='Average' value={(good - bad)/(bad + neutral + good)} />
          <StatisticLine text='Positive' value={(good / (bad + neutral + good))*100} />
        </div>
    )
  }
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App