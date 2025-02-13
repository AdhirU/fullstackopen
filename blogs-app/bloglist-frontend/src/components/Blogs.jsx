import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const Blogs = () => {
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort((b1, b2) => b2.likes - b1.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell align="center">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell align="right">{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
