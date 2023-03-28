import ShowCountry from "./showCountry"
import ShowCountryDetails from "./showCountryDetails"

const ShowCountryList = ({countries, onClickHandle}) => {
  if (countries.length === 1)
    return (
      <>
        <ShowCountryDetails country={countries[0]} />
      </>
    )

  else if (countries.length <= 10)
    return (
      <>
        {countries.map((cntry, i) =>
          <ShowCountry
            key={i}
            country={cntry}  
            onClickHandle={() => onClickHandle(cntry.name.common)}
          />
        )}
      </>
    )
  else
  return 'Too manu matches, specify another filter'
}

export default ShowCountryList