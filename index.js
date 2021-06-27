const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
//import route
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const courseRoute = require("./routes/course");
const feedbackRoute = require("./routes/feedback");
const challengeRoute = require("./routes/challenge");

app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

//middlewares
app.use(express.json());
//route middleware
app.get("/", (req, res) => res.send("Hai"));
app.use("/api/user/", authRoute);
app.use("/api/post/", postRoute);
app.use("/api/course/", courseRoute);
app.use("/api/feedback/", feedbackRoute);
app.use("/api/challenge/", challengeRoute);

const port = process.env.PORT || 3000;
app.listen(port);
