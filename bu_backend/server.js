const cors = require("cors");
const express = require("express");

const merkletree_adapter = require("./src/adapters/merkletree.adapter");

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

app.get("/tree", (req, res) => {
  merkletree_adapter.getTree().then(tree => {
    res.json(tree)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/tree/root", (req, res) => {
  merkletree_adapter.getTreeRoot().then(root => {
    res.json(root)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/tree/leaf/:id", (req, res) => {
  merkletree_adapter.getLeafAndProofById(req.params.id).then(leafAndProof => {
    res.json(leafAndProof)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/leaf/:id", (req, res) => {
  merkletree_adapter.getLeafById(req.params.id).then(leaf => {
    res.json(leaf)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/tree/leaves", (req, res) => {
  merkletree_adapter.getAllLeaves().then(leaves => {
    res.json(leaves)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/tree/leaves/qtd", (req, res) => {
  merkletree_adapter.getAllLeaves().then(leaves => {
    res.json(leaves.length)
  }).catch((err) => {
    res.json(err)
  })
})

const buRoutes = require("./src/routes/buRoutes");
app.use("/bu", buRoutes);

const infobuRoutes = require("./src/routes/infobusRoutes");
app.use("/infoBUs", infobuRoutes);

const rootRoutes = require("./src/routes/rootRoutes");
app.use("/root", rootRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});