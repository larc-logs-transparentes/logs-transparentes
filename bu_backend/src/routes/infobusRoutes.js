const router = require('express').Router();
const infobu_controller = require('../controllers/infobu.controller')
const infobu_merkletree_adapter = require('../adapters/infobus_merkletree.adapter')

router.post("/create", (req, res) => {
    infobu_controller.initialize().then(response => {
      console.log("infobus populados")
      res.json(response)
    }).catch((err) => {
      res.json(err)
    })
})

router.get("/", (req, res) => {
    const id = parseInt(req.query.id)

    /* optional query */
    let id_final = parseInt(req.query.id_final)
    if(!id_final) id_final = id
    
    infobu_controller.findByIdRange(id, id_final).then((response) => {
      res.json(response);
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/tree/leaf", async (req, res) => {
    const id = parseInt(req.query.id)
  
    /* optional query */
    let id_final = parseInt(req.query.id_final)
    if(!id_final) id_final = id
  
    const infoBUs = await infobu_controller.findByIdRange(id, id_final)
  
    infobu_merkletree_adapter.getProof(infoBUs).then((response) => {
      res.json(response);
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/tree/resultProof", async (req, res) => {
    const i_inicial = parseInt(req.query.i_inicial)
    const i_final = parseInt(req.query.i_final)

    infobu_merkletree_adapter.getResultProof(i_inicial, i_final).then((response) => {
      res.json(response);
    }).catch((err) => {
      res.json(err)
    })
})
  
router.get("/tree/root", async (req, res) => {
    infobu_merkletree_adapter.getRoot().then((response) => {
      res.send(response);
    }).catch((err) => {
      res.json(err)
    })
})

module.exports = router;