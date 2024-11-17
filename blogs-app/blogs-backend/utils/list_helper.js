const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let map = {}
  blogs.forEach(blog => map[blog.author] = (map[blog.author] || 0) + 1)
  const mostFreq = Object.keys(map).reduce((prev, cur) => map[prev] > map[cur] ? prev : cur)
  return { author: mostFreq, blogs: map[mostFreq] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let map = {}
  blogs.forEach(blog => map[blog.author] = (map[blog.author] || 0) + blog.likes)
  const mostFreq = Object.keys(map).reduce((prev, cur) => map[prev] > map[cur] ? prev : cur)
  return { author: mostFreq, likes: map[mostFreq] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }