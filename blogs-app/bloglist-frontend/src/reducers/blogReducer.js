import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    incrementLikes(state, action) {
      const id = action.payload;
      const blog = state.find((blog) => blog.id === id);
      blog.likes += 1;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    },
    appendComment(state, action) {
      const id = action.payload.id;
      const blog = state.find((blog) => blog.id === id);
      blog.comments.push(action.payload.comment);
    }
  },
});

export const { appendBlog, setBlogs, incrementLikes, deleteBlog, appendComment } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (e) {
      console.log("ERROR!!");
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          "message",
          5,
        ),
      );
      return true;
    } catch (e) {
      dispatch(setNotification(e.response.data.error, "error", 5));
      return false;
    }
  };
};

export const likeBlog = (blogObject, id) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blogObject, id);
      dispatch(incrementLikes(updatedBlog.id));
    } catch (e) {
      console.log(e.response.data.error);
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
    } catch (e) {
      console.log(e);
    }
  }
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(comment, blogId);
      dispatch(appendComment({ id: blogId, comment }))
    } catch (e) {
      console.log(e)
    }
  }
}

export default blogSlice.reducer;
