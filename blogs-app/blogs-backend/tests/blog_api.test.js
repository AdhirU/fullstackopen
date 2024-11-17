const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there are initially some blogs and a user saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany()
    await User.deleteMany()
  
    const user = await helper.defaultUser()
  
    helper.initialBlogs.forEach(blog => blog.user = user.id)
  
    await Blog.insertMany(helper.initialBlogs)
  
    // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)
  })
  
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const blogs = await api.get('/api/blogs')
  
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
  })
  
  test('_id key is renamed to id', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]
    assert(Object.keys(firstBlog).includes('id'))
    assert(!Object.keys(firstBlog).includes('_id'))
  })
  
  describe('adding a new blog', () => {
    let token
    let user

    beforeEach(async () => {
      const users = await helper.usersInDb()
      user = users[0]

      const result = await api.post('/api/login')
        .send({ username: user.username, password: 'secret' })

      token = result.body.token
    })
    test('succeeds with valid data', async () => {
      const newBlog = { title: 'Created Blog', url: 'blog.com', author: 'Me', likes: 20, user: user.id }
    
      await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization',`Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(helper.initialBlogs.length + 1, blogsAtEnd.length)
    
      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Created Blog'))
    })
    test('causes `likes` value to default to zero', async () => {
      const newBlog = { title: 'Created Blog', url: 'blog.com', author: 'Me', user: user.id }
    
      await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization',`Bearer ${token}`)

      const blogsAtEnd = await helper.blogsInDb()
      const createdBlog = blogsAtEnd.find(b => b.title === 'Created Blog')
      assert.strictEqual(createdBlog.likes, 0)
    })
    
    test('fails if title or url is missing', async () => {
      const blogWithoutTitle = { url: 'blog.com', author: 'Me', likes: 40, user: user.id }
      await api.post('/api/blogs')
        .send(blogWithoutTitle)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
    
      const blogWithoutUrl = { title: 'Created blog', author: 'Me', likes: 40, user: user.id }
      await api.post('/api/blogs')
        .send(blogWithoutUrl)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(helper.initialBlogs.length, blogsAtEnd.length)
    })
  })
  
  
  
  
  describe('updating a blog', () => {
    test('succeeds with status code 200 for valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const firstBlog = blogsAtStart[0]

      const userId = firstBlog.user.toString()
  
      const updatedBlog = structuredClone(firstBlog)
      updatedBlog.likes += 10
      updatedBlog.user = userId
  
      const responseBlog = await api.put(`/api/blogs/${firstBlog.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      assert.strictEqual(responseBlog.body.likes, updatedBlog.likes)
  
      const blogsAtEnd = await helper.blogsInDb()
      const updatedInDb = blogsAtEnd.find(blog => blog.title === firstBlog.title)
      assert.strictEqual(updatedInDb.likes, firstBlog.likes + 10)
    })
  
    test('fails with status code 404 if id does not exist', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const firstBlog = blogsAtStart[0]
      const userId = firstBlog.user.toString()

      const updatedBlog = structuredClone(firstBlog)
      updatedBlog.likes += 10
      updatedBlog.user = userId
  
      const validNonExistingtId = await helper.nonExistingId()
  
      await api.put(`/api/blogs/${validNonExistingtId}`)
        .send(updatedBlog)
        .expect(404)
  
      const blogsAtEnd = await helper.blogsInDb()
      const updatedInDb = blogsAtEnd.find(blog => blog.title === firstBlog.title)
      assert.strictEqual(updatedInDb.likes, firstBlog.likes)
    })
  })
  
  describe('deleting a blog', () => {
    let token
    let user

    beforeEach(async () => {
      const users = await helper.usersInDb()
      user = users[0]

      const result = await api.post('/api/login')
        .send({ username: user.username, password: 'secret' })

      token = result.body.token
    })

    test('succeeds with status code 204 for valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const firstBlog = blogsAtStart[0]
  
      await api.delete(`/api/blogs/${firstBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  
      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(firstBlog.title))
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany()
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ name: 'Root User', username: 'root', passwordHash})
    await user.save()
  })

  describe('creation of new user', () => {
    test('succeeds with status code 201 with valid data', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'newuser',
        name: 'New User',
        password: 'topsecret'
      }

      await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes('newuser'))
    })

    test('fails with status code 400 if username is not unique', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'New User',
        password: 'topsecret'
      }

      const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('expected `username` to be unique'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if username is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'New User',
        password: 'topsecret'
      }

      const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(result.body.error)

      assert(result.body.error.includes('Path `username` is required'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if username length is < 3', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'nu',
        name: 'New User',
        password: 'topsecret'
      }

      const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes(`\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length`))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if password is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'New User',
        username: 'newuser'
      }

      const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(result.body.error)

      assert(result.body.error.includes('Path `password` is required'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if password length is < 3', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'newuser',
        name: 'New User',
        password: 'ts'
      }

      const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('password must be length 3 or more'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})

