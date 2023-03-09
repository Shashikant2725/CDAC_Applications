const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.post("/upload", uploader.single("singleFile"), (req, res) => {
    /*
      #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['singleFile'] = {
          in: 'formData',
          type: 'file',
          required: 'true',
          description: 'Some description...',
    } */

    const file = req.file;
});

// (Swagger 2.0) Upload multiple files using Multer
app.post("/uploads", uploader.array("multFiles", 2), (req, res) => {
    /*
      #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['multFiles'] = {
          in: 'formData',
          type: 'array',
          required: true,
          description: 'Some description...',
          collectionFormat: 'multi',
          items: { type: 'file' }
      } */

    const files = req.files;
});