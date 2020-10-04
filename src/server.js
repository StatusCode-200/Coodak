const express = require("express");
const bodyParser = require("body-parser");

const usersRouter = require("./users/router");
const usersProjectsRouter = require("./userProjects/router");
const usersChallengesRouter = require("./userChallenges/router");
const challengesRouter = require("./challenges/router");
const githubOauth = require("./auth/middleware/githubOauth");
const googleOauth = require("./auth/middleware/googleOauth");
const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// page not found middleware
app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/signin", (req, res) => {
  res.status(200).render("signin");
});

app.get("/codeeditor", (req,res)=>{
  res.render("codeeditor",{project: null});
});

app.get("/profile", (req,res)=>{
  res.render("profile");
});

app.use("/users", usersRouter);
app.use("/users", usersProjectsRouter);
app.use("/users", usersChallengesRouter);
app.use("/challenges", challengesRouter);

app.get("/oauth", googleOauth, (req, res) => {
  res.status(200).redirect("/");
});

// Routes
app.get("/oauth2", githubOauth, (req, res) => {
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
    app.listen(PORT, () => {
      console.log(`server started - ${PORT}`);
    });
  },
};
