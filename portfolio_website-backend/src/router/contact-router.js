const express = require('express');
const { createcontact } = require("../controller/contact-controller.js");
const multer=require("multer")
const router = express.Router();
const uploads=multer()
module.exports = (app) => {
  router.post("/contact",uploads.none(), createcontact);

  app.use("/api", router);
};
