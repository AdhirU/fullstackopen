const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'My First Blog',
    author: 'Me',
    url: 'blog.com',
    likes: 32
  },
  {
    title: 'My Second Blog',
    author: 'Myself',
    url: 'blog.com',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const defaultUser = async () => {
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ name: 'Root User', username: 'root', passwordHash })
  return await user.save()
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willberemoved', author: 'Me', url: 'blog.com', likes: 20 })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId,
  defaultUser
}