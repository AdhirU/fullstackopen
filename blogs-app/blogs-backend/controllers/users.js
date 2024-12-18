const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password) {
    return response.status(400).json({ error: 'Path `password` is required'})
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be length 3 or more' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  return response.json(users)
})

module.exports = usersRouter