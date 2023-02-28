const cors = require("cors");
const express = require("express");

const bu_controller = require("./src/controllers/bu.controller")
const infobu_controller = require("./src/controllers/infobu.controller")
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

// retrieve all BUs
app.get("/bu/get_all", (req, res) => {
  console.log("/bu/")
  bu_controller.findAll().then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
});
app.get("/root/get_all", (req, res) => {
  console.log("/root/")
  bu_controller.findAllroot().then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
});

// retrieve list of BUs with GET parameters.
app.get("/bu", (req, res) => {
  bu_controller.findByIdRange(req.query.id_inicial, req.query.id_final)
  .then((response) => {
    res.json(response)
  })
  
});

// save new BU
app.post("/bu", (req, res) => {
  console.log("posting on /bu")
  const result = bu_controller.create(req.body)
  res.json(result)
})

app.get("/bu/get_one/", (req, res) => {
  console.log(req.query)
  bu_controller.findByInfo(req.query.turno, req.query.uf, req.query.zona, req.query.secao).then((response) => {
    // console.log(response)
    res.json(response)
  }).catch((err) => {
    res.json(err)
  })
})

// retrieve BU by ID
app.get("/bu/:id", (req, res) => {
  console.log(req.params.id)
  bu_controller.findById(req.params.id).then((response) => {
    // console.log({response})
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
})

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

app.get("/home",(req,res) => {   //Atualiza o grafico da tela principal 
  bu_controller.Sum().then((response) => {
    res.json(response)
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

app.post("/infoBUs/create", (req, res) => {
  infobu_controller.inicializar().then(response => {
    console.log("infobus populados")
    res.json(response)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/infoBUs", (req, res) => {
  const id = parseInt(req.query.id)
  let id_final = parseInt(req.query.id_final)
  if(!id_final) id_final = id
  infobu_controller.findByIdRange(id, id_final).then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
})

app.get("/infoBUs/tree/leaf", async (req, res) => {
  const id = parseInt(req.query.id)

  /* query opcional */
  let id_final = parseInt(req.query.id_final)
  if(!id_final) id_final = id

  const infoBUs = await infobu_controller.findByIdRange(id, id_final)

  merkletree_adapter.infoBUs_getProof(infoBUs).then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
})

app.get("/infoBUs/tree/resultProof", async (req, res) => {
  const i_inicial = parseInt(req.query.i_inicial)
  const i_final = parseInt(req.query.i_final)
  merkletree_adapter.infoBUs_getResultProof(i_inicial, i_final).then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
})

app.get("/infoBUs/tree/root", async (req, res) => {
  merkletree_adapter.infoBUs_getRoot().then((response) => {
    res.send(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});