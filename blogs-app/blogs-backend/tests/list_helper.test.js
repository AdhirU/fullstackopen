const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]


describe('dummy test', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy([])
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('when list is empty, equals zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs, return sum of likes for the blogs', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, equals null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    })
  })

  test('when list has many blogs, equals blog with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('when list is empty, equals null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('when list has one blog, return its author and freq', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1
  })
  })

  test('when list has many blogs, return author with most entries', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('when list is empty, equals null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('when list has one blog, return its author and likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      likes: 5
  })
  })

  test('when list has many blogs, return author with most entries', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})