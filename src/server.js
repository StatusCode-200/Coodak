const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const usersRouter = require("./users/router");
const usersProjectsRouter = require("./userProjects/router");
const usersChallengesRouter = require("./userChallenges/router");
const usersChallengeWhiteboardRouter = require("./whiteBoard/router");
const challengesRouter = require("./challenges/router");
const commentsRouter = require("./challengeComment/router");

const bearerAuth = require("./auth/middleware/bearerAuth.js");
const optionalAuth = require("./auth/middleware/optionalAuth");

const githubOauth = require("./auth/middleware/githubOauth");
const googleOauth = require("./auth/middleware/googleOauth");
const socketHandler = require("./socketHandler");

const app = express();
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer);
socketHandler(io);

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// adnan  methodOverride
app.use((req, res, next) => {
  if (req.query && req.query._method){ // eslint-disable-line
    req.method = req.query._method; // eslint-disable-line
  }
  next();
});

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  console.log(req.method, req.url);
  next();
});

// page not found middleware
app.get("/", optionalAuth, (req, res) => {
  res.status(200).render("index" , { userId : req.user? req.user.validUser._id : null});
});

app.get("/signin", (req, res) => {
  res.status(200).render("signin");
});

app.get("/signup", (req, res) => {
  res.status(200).render("signup");
});


app.get("/codeeditor",optionalAuth, (req,res)=>{
  res.render("codeeditor",{project: null, userId : req.user? req.user.validUser._id : null});
});

app.get("/profile",bearerAuth, (req,res)=>{
  res.render("profile", {userId:req.user.validUser._id});
});

app.get("/addChallenge", (req,res)=>{
  res.render("addChallenge");
});

app.use("/users", usersRouter);
app.use("/users", usersProjectsRouter);
app.use("/users", usersChallengesRouter);
app.use("/users", usersChallengeWhiteboardRouter);
app.use("/challenges", challengesRouter);
app.use("/challenges", commentsRouter);

app.get("/oauth", googleOauth, (req, res) => {
  res.cookie("token", req.token);
  res.cookie("userId", req.user._id);
  res.status(200).redirect("/");
});

// Routes
app.get("/oauth2", githubOauth, (req, res) => {
  res.cookie("token", req.token);
  res.cookie("userId", req.user._id);
  res.status(200).redirect("/");
});

// page not found middleware
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Sorry, page not found !" });
});

// error middleware
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).send({ msg: !err.message ? err : err.message });
});

const PORT = process.env.PORT || 3000;

module.exports = {
  server: app,
  start: () => {
    httpServer.listen(PORT, () => {
      console.log(`server started - ${PORT}`);
    });
  },
};
