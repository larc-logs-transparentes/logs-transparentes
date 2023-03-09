const router = require("express").Router()
const bus_merkletree_adapter = require("../adapters/bus_merkletree.adapter")

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

module.exports = router