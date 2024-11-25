import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, userId }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hiddenStyle = {
    display: visible ? '' : 'none'
  }

  const handleLike = () => {
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    likeBlog(blogObject, blog.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='info'>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={hiddenStyle} className='more-info'>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        {(userId === blog.user.id) ?
          <button onClick={handleDelete}>remove</button> :
          null
        }
      </div>
    </div>
  )
}


export default Blog