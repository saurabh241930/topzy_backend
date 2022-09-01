const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const session = require('express-session');
const sls = require('serverless-http')



require("dotenv").config();
const auth = require("./routes/auth.routes");
const posts = require("./routes/posts.routes");
const comments = require("./routes/comments.routes");
const followings = require("./routes/followings.routes");
const followers = require("./routes/followers.routes");
const profiles = require("./routes/profiles.routes");
const messages = require("./routes/message.routes")

const verifyAuthentication = require("./middlewares/auth.middleware");

const app = express();
app.use(morgan('tiny'));

// Session middleware
app.use(session({
  secret: 'somesuperdupersecret',
  resave: true,
  saveUninitialized: true
}))

const connectToDB = require("./db/db");

connectToDB(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome to the Probook API!",
  });
});


app.use("/auth", auth);
app.use(verifyAuthentication);
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.use("/api/comments", comments);
app.use("/api/followers", followers);
app.use("/api/followings", followings);
app.use("/api/message", messages)

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));