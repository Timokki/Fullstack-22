import { useState } from "react"

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
      <div>
        Good {good}<br/>
        Neutral {neutral}<br/>
        Bad {bad}<br/>
      </div>
    </div>
  )
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

export default App