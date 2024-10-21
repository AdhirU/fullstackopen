const Countries = ({ countries, token, selectCountry }) => {
  if (token.length === 0) {
    return null
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => selectCountry({...country})}>show</button>
        </div>))
    )
  } else if (countries.length === 1) {
    return null
  } else {
    return <p>No countries matched</p>
  }
}

export default Countries