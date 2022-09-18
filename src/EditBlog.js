import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import FileBase from "react-file-base64";

const EditBlog = () => {
  const [blogInfo, setBlogInfo] = useState({
    creator: "",
    title: "",
    description: "",
    tags: "",
    fileUpload: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:4000/api/blogs/${id}`).then((resp) => {
      console.log(resp.data);
      setBlogInfo({
        creator: resp.data.creator,
        title: resp.data.title,
        description: resp.data.description,
        tags: resp.data.tags,
        fileUpload: resp.data.fileUpload,
      });
    });
  }, []);

  const editBlog = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/api/blogs/${id}`, blogInfo)
      .then((resp) => {
        console.log(resp);
        alert("Your blog is successfuly edited");
      });
  };

  return (
    <div>
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
          onSubmit={(e) => editBlog(e)}
        >
          <Typography
            variant="h5"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            ✨ Edit your blog ✨
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
            onChange={(e) =>
              setBlogInfo({ ...blogInfo, title: e.target.value })
            }
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
            Edit 📝
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EditBlog;
