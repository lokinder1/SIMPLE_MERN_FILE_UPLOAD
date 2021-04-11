import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  root: { margin: "20px", padding: "10px" },

  main: {
    padding: " 50px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  fileInfo: {
    padding: "50px !important",
  },
}));

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export default function SingleFileUpload() {
  const classes = useStyles();

  // State to store uploaded file
  const [file, setFile] = useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    const data = new FormData();
    data.append("singleFile", file);

    axios
      .post("http://localhost:4000/upload/single", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        toast.success("upload success");
        console.log(res);
      })
      .catch((err) => {
        toast.error("upload fail");
        console.error(err);
      });
    // Add code here to upload file to server
    // ...
  }

  return (
    <div className={classes.root}>
      <h2>Single Image File</h2>

      <div className={classes.main}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          <input type="file" onChange={handleUpload} />
        </Button>
      </div>
      <div className={classes.fileInfo}>
        <p>Filename: {file.name}</p>
        <p>File type: {file.type}</p>
        <p>File size: {file.size} bytes</p>
      </div>
      <ToastContainer />
    </div>
  );
}
