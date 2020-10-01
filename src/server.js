const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// page not found middleware
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World!" });
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
