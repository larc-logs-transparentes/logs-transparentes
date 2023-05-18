const router = require("express").Router()
const bus_merkletree_adapter = require("../adapters/bus_merkletree.adapter")
const bu_controller = require("../controllers/bu.controller")

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

router.post("/create-tree", (req, res) => {
  let tree_name = req.body["tree-name"]
  let commitment_tree = req.body["commitment-size"]
  bu_controller.createTree(tree_name, commitment_tree).then((response) => {
      res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

router.post("/commit", (req, res) => {
  let tree_name = req.body["tree-name"]
  bu_controller.commit(tree_name).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

router.get("/data-proof", (req, res) => {
  const index = req.query["index"]  
  const data = req.query["data"]
  bu_controller.getDataProof(index, data).then((response) => {
    res.json(response); 
  }).catch((err) => {
    res.json(err)
  })
})

router.get("/all-consistency-proof", (req, res) => {
  bu_controller.getConsistencyProof().then((response) => {
    res.json(response);
  }).catch((err) => {
    res.json(err)
  })
})

module.exports = router