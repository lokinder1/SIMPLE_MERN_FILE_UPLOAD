const express = require("express");
var multer = require("multer");
var cors = require('cors');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageFilter= function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter });

const app = express();
app.use(cors());

app.post(
  "/upload/single",
  upload.single("singleFile"),
  function (req, res) {
    try {
      res.status(200).send("file uploaded");
    } catch (err) {
      res.send(400);
    }

  }
);

app.post(
  "/upload/multi",
  upload.array("multiFiles", 12),
  function (req, res) {
    try {
      res.status(200).send("all files uploaded");
    } catch (err) {
      res.send(400);
    }
  }
);

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
