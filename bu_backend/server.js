const express = require("express");
//app.use(...);
const db = require("./src/models");
db.sequelize.sync();
const cors = require("cors");
const app = express();
const bu_controller = require("./src/controllers/bu.controller")

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend Executando" });
});

app.get("/bu/all", (req, res) => {
  console.log("/bu/all")
  bu_controller.findAll().then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
});

app.post("/bu", (req, res) => {
  console.log("posting on /bu")
  const result = bu_controller.create(req.body)
  res.json(result)
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});