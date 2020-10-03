const express = require("express");
const bodyParser = require("body-parser");

const testRouter = require("./test/router");
const usersRouter = require("./users/router");
const usersProjectsRouter = require("./userProjects/router");
const usersChallengesRouter = require("./userChallenges/router");
const ChallengesRouter = require("./challenge/router");
const githubOauth = require("./auth/middleware/githubOauth")
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
  res.status(200).send({ msg: "Hello World!" });
});

app.use("/test", testRouter);
app.use("/users", usersRouter);
app.use("/users", usersProjectsRouter);
app.use("/users", usersChallengesRouter);
app.use("/challenges", ChallengesRouter);

// Routes
app.get('/oauth', githubOauth, (req, res) => {
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
