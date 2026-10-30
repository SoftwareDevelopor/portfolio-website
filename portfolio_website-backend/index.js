const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

// Configure CORS to allow your Vercel frontend domain
const corsOptions = {
  origin: [
    "https://portfolio-resume-website-8bt4.onrender.com", // without trailing slash
    "https://portfolio-resume-website-8bt4.onrender.com/", // with explicit port,
  ],
  methods: ['POST'],
  credentials: true,             // Allow credentials
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Well, Server API is Connected!");
});

require("./src/router/contact-router.js")(app);

const mongodb=process.env.MONGODBURL
app.listen(8000, () => {
  mongoose
    .connect(mongodb)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
});
