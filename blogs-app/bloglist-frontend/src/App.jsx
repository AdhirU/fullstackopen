import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch, Link } from "react-router-dom";

import Notification from "./components/Notification";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";

import blogService from "./services/blogs";

import { initializeBlogs } from "./reducers/blogReducer";
import { removeUser, setUser } from "./reducers/userReducer";
import { initializeUserList } from "./reducers/userListReducer";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch]);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      blogService.setToken(parsedUser.token);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(removeUser());
  };

  const user = useSelector((state) => state.user);

  const padding = {
    padding: 5,
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to="/">
              blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
              users
          </Button>
          <span style={padding}>{user.name} logged in</span>
          <Button color='inherit' onClick={logout}>logout</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography align="center" variant="h2">
          Blog App
        </Typography>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<Blogs />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
