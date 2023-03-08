const ShowPerson = ({person, onClickHandle}) => {
  return (
    <>
    <h4>{person.name} {person.number} <button onClick={onClickHandle}>delete</button></h4>
    </>
  )
}

export default ShowPerson