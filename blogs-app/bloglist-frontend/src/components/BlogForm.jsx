import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Button, TextField, Typography } from '@mui/material'

const BlogForm = ({ toggleRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = { title, author, url };
    console.log(blogObject)

    const success = await dispatch(createBlog(blogObject));
    if (success) {
      toggleRef.current.toggleVisibility();
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <>
      <Typography variant="h4">Create New Blog</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField label="Title" margin='dense' value={title} onChange={e => setTitle(e.target.value)}/>
          {/* <label htmlFor="title">title</label>
          <input
            id="title"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          /> */}
        </div>
        <div>
          <TextField label="Author" margin='dense' value={author} onChange={e => setAuthor(e.target.value)}/>

          {/* <label htmlFor="author">author</label>
          <input
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          /> */}
        </div>
        <div>
         <TextField label="URL" margin='dense' value={url} onChange={e => setUrl(e.target.value)}/>

          {/* <label htmlFor="url">url</label>
          <input
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          /> */}
        </div>
        <Button fullWidth={true} variant="contained" type="submit">create</Button>
      </form>
    </>
  );
};

export default BlogForm;
