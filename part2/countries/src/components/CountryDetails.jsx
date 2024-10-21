const CountryDetails = ({ country, weatherData }) => {
  if (country === null) {
    return null
  }
  const capital = country.capital[0]
  const weather = weatherData[capital]
  if (weather === undefined) {
    return null
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(lang => {
          return <li key={lang[0]}>{lang[1]}</li>
        })}
      </ul>
      <img style={{width:150}} src={country.flags.png} />
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.temp} Celcius</p>
      <img src={weather.logo} />
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}

export default CountryDetails