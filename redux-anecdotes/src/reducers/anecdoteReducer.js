import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdotes(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? action.payload : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdotes, setAnecdotes, appendAnecdote } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = anecdote => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(newAnecdote)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer