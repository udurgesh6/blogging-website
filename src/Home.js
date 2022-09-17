import React, { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/blogs").then((response) => {
      console.log(response);
      setBlogs(response.data);
    });
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
