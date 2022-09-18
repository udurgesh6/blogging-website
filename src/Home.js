import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/blogs").then((response) => {
      console.log(response);
      setBlogs(response.data);
    });
  }, []);

  const onEditBlog = (id) => {
    navigate(`/edit_blog/${id}`);
  };

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:4000/api/blogs/${id}`).then((response) => {
      console.log(response);
      window.location.reload();
      // let tempBlog = [...blogs];
      // console.log(tempBlog);
      // console.log(id);
      // tempBlog.filter((tB) => parseInt(tB._id) !== id);
      // setBlogs(tempBlog);
    });
  };

  return (
    <div>
      <h3>My Blogs</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {blogs.map((blog) => (
          <div key={blog._id}>
            <p>Title - {blog.title}</p>
            <p>Creator - {blog.creator}</p>
            <p>Description - {blog.description}</p>
            <p>Created At - {blog.createdAt}</p>
            <p>Upvote - {blog.upvote}</p>
            <img src={blog.fileUpload} height="200px" width="200px" />
            <Button onClick={() => onEditBlog(blog._id)}>Edit</Button>
            <Button onClick={() => deleteBlog(blog._id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
