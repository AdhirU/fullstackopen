import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { likeBlog, removeBlog, addComment } from "../reducers/blogReducer";
import { Box, Button, TextField, Typography } from '@mui/material'

const Blog = () => {
  const id = useParams().id;

  const blog = useSelector(({ blogs }) => {
    return blogs.find((b) => b.id === id);
  });

  const userId = useSelector(state => state.user.id)
  const navigate = useNavigate();

  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(likeBlog(blogObject, blog.id));
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(removeBlog(blog.id));
      navigate("/")
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    dispatch(addComment(blog.id, comment));
  }

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography variant='h4'>
        {blog.title} {blog.author}
      </Typography>
      <Typography>
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography>
        Likes {blog.likes} <Button size='small' variant='contained' onClick={handleLike}>like</Button>
      </Typography>
      <Typography>
        Added by {blog.user.name}
      </Typography>
      <Box>
        {userId === blog.user.id ? (
          <Button variant='contained' size='small' color='error' onClick={handleDelete}>remove</Button>
        ) : null}
      </Box>
      <Typography variant='h5'>Comments</Typography>
      <form onSubmit={handleComment}>
        <TextField size='small' type="text" name="comment"/>
        <Button variant='contained' type='submit'>add comment</Button>
      </form>
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}><Typography>{comment}</Typography></li>
        ))}
      </ul>
    </Box>
  );
};

export default Blog;
