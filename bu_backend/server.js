const express = require("express");
const cors = require("cors");
const app = express();
const bu_controller = require("./src/controllers/bu.controller")
const infobu_controller = require("./src/controllers/infobu.controller")
const merkletree_adapter = require("./src/adapters/merkletree.adapter");
const mongoose = require("mongoose");

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connect URL
const url = 'mongodb://127.0.0.1:27017/bu_db';
mongoose.connect(url)
  .then(() => {
    mongoose.connection.db.dropCollection("bus", ()=>{
      console.log("bus collection droped")
      // mongoose.connection.close()
    })
    mongoose.connection.db.dropCollection("infobus", ()=>{
      console.log("infobus collection droped")
      // mongoose.connection.close()
    })
  })


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

app.get("/infoBUs/create", (req, res) => {
  infobu_controller.inicializar().then(response => {
    console.log("infobus populados")
    res.json(response)
  }).catch((err) => {
    res.json(err)
  })
})

app.get("/infoBUs/:id", (req, res) => {
  console.log(req.params.id)
  infobu_controller.findById(req.params.id).then((response) => {
    res.json(response);
  }).catch((err) => {
    console.log(err);
    res.json(err)
  })
})

app.get("/infoBUs", (req, res) => {
  console.log(req.params.id)
  infobu_controller.findAll().then((response) => {
    res.json(response);
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