const router = require("express").Router()
const bus_merkletree_adapter = require("../adapters/bus_merkletree.adapter")
const bu_controller = require("../controllers/bu.controller")

/* Mapas routes */
router.get("/", (req, res) => {
    bus_merkletree_adapter.getTree().then(tree => {
      res.json(tree)
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/root", (req, res) => {
    bus_merkletree_adapter.getTreeRoot().then(root => {
      res.json(root)
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/leaf/:id", (req, res) => {
    bus_merkletree_adapter.getLeafAndProofById(req.params.id).then(leafAndProof => {
      res.json(leafAndProof)
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/leaves", (req, res) => {
    bus_merkletree_adapter.getAllLeaves().then(leaves => {
      res.json(leaves)
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/tree-size", (req, res) => {
    bus_merkletree_adapter.getAllLeaves().then(leaves => {
      res.json(leaves.length)
    }).catch((err) => {
      res.json(err)
    })
})

/* TLManager routes */
/* admin routes */
router.post("/insert-leaf", (req, res) => {
  const tree_name = req.body["tree-name"]
  const data = req.body.data
  bu_controller.addLeaf(tree_name, data).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

router.post("/create-tree", (req, res) => {
  const tree_name = req.body["tree-name"]
  const commitment_tree = req.body["commitment-size"]
  bu_controller.createTree(tree_name, commitment_tree).then((response) => {
      res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

router.post("/commit", (req, res) => {
  const tree_name = req.body["tree-name"]
  bu_controller.commit(tree_name).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

/* Tree routes */
router.get("/information", (req, res) => {
  const tree_name = req.query["tree-name"]
  bu_controller.getTree(tree_name).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

router.get("/tree-root", (req, res) => {
  const tree_name = req.query["tree-name"]
  bu_controller.getTreeRoot(tree_name).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

/* Proofs routes */
router.get("/all-consistency-proof", (req, res) => {
  const tree_name = req.query["tree-name"]
  bu_controller.getConsistencyProof(tree_name).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

router.get("/data-proof", (req, res) => {
  const tree_name = req.query["tree-name"]
  const index = req.query["index"]  
  bu_controller.getDataProof(tree_name, index).then((response) => {
    res.json(response); 
  }).catch((err) => {
    res.json(err)
  })
})

router.get("/inclusion-proof", (req, res) => {
  const tree_name = req.query["tree-name"]
  const index = req.query["index"]
  bu_controller.getInclusionProof(tree_name, index).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

module.exports = router