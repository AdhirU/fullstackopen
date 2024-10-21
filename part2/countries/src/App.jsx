import { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'
import countriesService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [searchToken, setSearchToken] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    countriesService.getAll()
      .then(allCountries => {
        // console.log(allCountries)
        // const countryNames = allCountries.map(country => country.name.common)
        setCountries(allCountries)
      })
  }, [])

  useEffect(() => {
    setSelectedCountry(null)
  },[searchToken])

  useEffect(() => {
    if (selectedCountry !== null) {
      const city = selectedCountry.capital[0]
      if (!weatherData || !(city in weatherData)) {
        weatherService.get(city)
        .then(res => {
          const weatherObj = {
            temp: res.main.temp, 
            wind: res.wind.speed,
            logo: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
          }
          setWeatherData({...weatherData, [city]: weatherObj})
        })
      }      
    }
  }, [selectedCountry])

  if (countries === null) {
    return null
  }
  
  const selectCountry = (country) => {
    setSelectedCountry(country)
  }

  const handleTokenChange = (event) => {
    setSearchToken(event.target.value)
  }

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchToken.toLowerCase())
  })

  if (filteredCountries.length === 1 && selectedCountry === null) {
    setSelectedCountry({...filteredCountries[0]})
  }


  return (
    <div>
      <Search searchToken={searchToken} onChange={handleTokenChange}/>
      <Countries countries={filteredCountries} token={searchToken} selectCountry={selectCountry}/>
      <CountryDetails country={selectedCountry} weatherData={weatherData}/>
    </div>
  )
}

export default App
