const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors_origin_url = require('./src/config/config').cors_origin_url
app.use(cors({origin: cors_origin_url}));

const { connect } = require("./src/config/mongodb.config");
mongoose = connect("mongodb://localhost:27017/bu", ["bus", "infobus", "roots"]);

// ##############################################################
// ########################## ROUTES ############################
// ##############################################################

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend Executando" });
});

const buRoutes = require("./src/routes/buRoutes");
app.use("/bu", buRoutes);

const infobuRoutes = require("./src/routes/infobusRoutes");
app.use("/infoBUs", infobuRoutes);

const rootRoutes = require("./src/routes/rootRoutes");
app.use("/root", rootRoutes);

const treeRoutes = require("./src/routes/treeRoutes");
app.use("/tree", treeRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});