import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ userList }) => {
    return userList.find(user => user.id === id)
  })

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant='h4'>{user.name}</Typography>
      <Typography variant='h6'>Added blogs</Typography>
      {user.blogs.map(b => (
        <li key={b.id}>{b.title}</li>
      ))}
    </div>
  )
}

export default User