const PersonInput = (props) => {
  const newName = props.newName
  const newNumber = props.newNumber
  const handleNameInputChange = props.handleNameInputChange
  const handleNumberInputChahge = props.handleNumberInputChahge
  const onClickHandle = props.onClickHandle

  return  (
    <form>  
          <h2>add a new</h2>
          <div>name: <input value={newName} onChange={handleNameInputChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberInputChahge} /></div>
          <div>
            <button onClick={onClickHandle} type="submit" >add</button>
          </div>
        </form>
  )
}
export default PersonInput