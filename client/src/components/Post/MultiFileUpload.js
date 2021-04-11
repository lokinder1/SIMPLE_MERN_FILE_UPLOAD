import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import PropTypes from "prop-types";
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

  button: {
    margin: " 8px !important",
  },
}));

const checkMimeType = (event) => {
  //getting file object
  let files = event.target.files;
  //define message container
  let err = [];
  // list allow mime type
  const types = ["image/png", "image/jpeg", "image/gif"];
  // loop access array
  for (let x = 0; x < files.length; x++) {
    // compare file type find doesn't matach
    if (types.every((type) => files[x].type !== type)) {
      // create error message and assign to container
      err[x] = files[x].type + " is not a supported format\n";
    }
  }
  for (var z = 0; z < err.length; z++) {
    // if message not same old that mean has error
    // discard selected file
    toast.error(err[z]);
    event.target.value = null;
  }
  return true;
};
const maxSelectFile = (event) => {
  let files = event.target.files;
  if (files.length > 3) {
    const msg = "Only 3 images can be uploaded at a time";
    event.target.value = null;
    toast.warn(msg);
    return false;
  }
  return true;
};
const checkFileSize = (event) => {
  let files = event.target.files;
  let size = 2000000;
  let err = [];
  for (var x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      err[x] = files[x].type + "is too large, please pick a smaller file\n";
    }
  }
  for (var z = 0; z < err.length; z++) {
    // if message not same old that mean has error
    // discard selected file
    toast.error(err[z]);
    event.target.value = null;
  }
  return true;
};

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
export default function MultiFileUpload() {
  const classes = useStyles();

  // State to store uploaded file
  const [files, setFiles] = useState("");
  const [loaded, setLoaded] = useState(0);

  // Handles file upload event and updates state
  function handleUpload(event) {
    if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) {
      setFiles(event.target.files);
    }
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  // Handles file upload event and updates state
  function handleSubmit(event) {
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append(`multiFiles`, files[i]);
    }

    axios
      .post("http://localhost:4000/upload/multi", data, {
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        // then print response status
        toast.success("upload success");
      })
      .catch((err) => {
        // then print response status
        toast.error("upload fail");
      });
  }
  return (
    <div className={classes.root}>
      <h2>Multi Image Files</h2>

      <div className={classes.main}>
        <ToastContainer />
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          <input type="file" onChange={handleUpload} multiple />
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {/* <input type="submit" onClick={handleSubmit} /> */}
      </div>
      <div className={classes.fileInfo}>
        <LinearProgressWithLabel value={loaded} />
        {/* <Progress max="100" color="success" value={loaded}>
            {Math.round(loaded, 2)}%
          </Progress> */}
      </div>
    </div>
  );
}
