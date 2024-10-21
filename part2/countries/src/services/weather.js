import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const get = (city) => {
  return axios.get(`${baseUrl}?q=${city}&appid=${apiKey}`)
    .then(res => res.data)
}

export default { get }