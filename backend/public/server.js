
const { app } = require("./src/init");
const application_config = require("./src/config.json").application_config

app.get("/", (req, res) => {
  res.json({ message: "Backend Executando" });
});

const bu_controller = require("./src/controllers/bu.controller");
app.use("/bu", bu_controller);

const tree_controller = require("./src/controllers/tree.controller");
app.use("/tree", tree_controller);

const election_data_controller = require("./src/controllers/election-data.controller");
app.use("/election-data", election_data_controller);

// set port, listen for requests
app.listen(application_config.port, () => {
  console.log(`Server is running on port ${application_config.port}.`);
});
