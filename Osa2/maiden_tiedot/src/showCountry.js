const ShowCountry = (props) => {
  console.log('ShowCountry props: ', props)
  return (
    <>
      {props.country.name.common} <br />
    </>
  )
}

export default ShowCountry