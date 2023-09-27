
const { app } = require("./src/init");

app.get("/", (req, res) => {
  res.json({ message: "Backend Executando" });
});

const bu_controller = require("./src/controllers/bu.controller");
app.use("/bu", bu_controller);

const tree_controller = require("./src/controllers/tree.controller");
app.use("/tree", tree_controller);

const global_tree_controller = require("./src/controllers/global_tree.controller");
app.use("/global_tree", global_tree_controller);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});