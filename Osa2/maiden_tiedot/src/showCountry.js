const ShowCountry = (props) => {
  console.log('ShowCountry props: ', props)
  return (
    <>
      {props.country.name.common} 
      <button onClick={props.onClickHandle}>show</button><br />
    </>
  )
}

export default ShowCountry