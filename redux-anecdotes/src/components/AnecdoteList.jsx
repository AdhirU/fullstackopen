import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => anecdotes.filter(anecdote => anecdote.content.includes(filter)))

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 5))
  }

  anecdotes.sort((a1, a2) => a2.votes - a1.votes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList