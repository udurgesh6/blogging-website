import React, { useState } from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const navigate = useNavigate();
  const [blogInfo, setBlogInfo] = useState({
    creator: "",
    title: "",
    description: "",
    tags: "",
    fileUpload: "",
  });
  const submitBlog = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:4000/api/blogs`, blogInfo).then((resp) => {
      navigate("/");
    });
  };
  return (
    <Paper
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <form
        autoComplete="on"
        noValidate
        style={{ width: "500px" }}
        onSubmit={(e) => submitBlog(e)}
      >
        <Typography
          variant="h5"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          ✨ Create a blog ✨
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          <Typography> 🖼️ Upload Blog Image</Typography>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBlogInfo({ ...blogInfo, fileUpload: base64 })
            }
          />
        </div>
        <TextField
          name="title"
          variant="outlined"
          label="🔥 Blog Title"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={blogInfo.title}
          onChange={(e) => setBlogInfo({ ...blogInfo, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="📙 Blog Description"
          fullWidth
          style={{ marginBottom: "20px" }}
          multiline
          rows={7}
          value={blogInfo.description}
          onChange={(e) =>
            setBlogInfo({ ...blogInfo, description: e.target.value })
          }
        />
        <TextField
          name="creator"
          variant="outlined"
          label="✍️ Author name"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={blogInfo.creator}
          onChange={(e) =>
            setBlogInfo({ ...blogInfo, creator: e.target.value })
          }
        />
        <Typography>Tags (5 max seperated by comma)</Typography>
        <TextField
          name="tags"
          variant="outlined"
          label="🏷️ Tags"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={blogInfo.tags}
          onChange={(e) =>
            setBlogInfo({ ...blogInfo, tags: e.target.value.split(",") })
          }
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          style={{ marginBottom: "20px" }}
        >
          Publish 📝
        </Button>
      </form>
    </Paper>
  );
};

export default AddBlog;
