import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const noteObj = { content, important: false }
  const response = await axios.post(baseUrl, noteObj)
  return response.data
}

export default {
  getAll,
  createNew
}