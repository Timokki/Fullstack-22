const Filter = ({newFilter, handleFilterInputChange}) => {
  return (
    <div> filter show with <input value={newFilter} onChange={handleFilterInputChange}/></div>
  )
}

export default Filter