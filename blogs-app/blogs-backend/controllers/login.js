const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  let passwordCorrect = false

  if (user) {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  }
  
  if (!passwordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userToken = {
    username,
    id: user.id
  }

  const token = jwt.sign(
    userToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response.status(200).send({ token, username, name: user.name })  
})

module.exports = loginRouter