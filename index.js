const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
//import route
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

app.use(helmet());
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

const port = process.env.PORT || 3000;
app.listen(port);
