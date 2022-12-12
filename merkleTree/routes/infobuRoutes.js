const router = require('express').Router()
const { MerkleTreePrefix } = require('../merkletreejs/dist/MerkleTreePrefix')
const { SHA256 } = require('crypto-js')
const resultProof = require('../controllers/resultProof.controller')

const infoBUsTree = new MerkleTreePrefix([], SHA256, {fillDefaultHash: true})

router.post('/leaves', (req, res) => {
    const infoBUs = req.body.data
    const leaves = []

    for (let index = 0; index < infoBUs.length; index++) {
        const infoBU = infoBUs[index];
        leaves.push({
            leaf: SHA256(JSON.stringify(infoBU)).toString(),
            vote: infoBU.votos_validos.map(candidato => ([candidato.nome, candidato.votos]))
        })
    }
    
    console.log(leaves)
    infoBUsTree.addLeaves(leaves)
    return res.json(req.body.data)
})

router.get('/', (req, res) => {
    console.log(infoBUsTree.toString())
    console.log("tree leaves: ", infoBUsTree.getLeafCount())
    console.log(infoBUsTree.getHexLayersFlat())
    res.send(infoBUsTree.getHexLayers())
})

router.get('/root', (req, res) => {
    const {leaf, vote} = infoBUsTree.getHexRoot()
    res.send({
        leaf: leaf,
        vote: vote
    })
})

router.get('/leaves', (req, res) => {
    if(req.query.id === undefined){
        const leaves = infoBUsTree.getHexLeaves()
        console.log(leaves)
        res.send(leaves)
        return
    }

    const leaf = infoBUsTree.getLeaf(req.query.id)
    console.log(leaf)
    res.send({
      "id": req.query.id,
      "leaf": leaf.leaf.toString('hex'),
      "vote": leaf.vote
    })
})
  
router.get('/leaf/:id', (req, res) => {
    // Return a leaf with id equals to id and its proof.
    const leaf = infoBUsTree.getLeaf(req.params.id)
    const root = infoBUsTree.getRoot()
    const proof = infoBUsTree.getProof(leaf, req.params.id)
    console.log(proof)
    console.log(infoBUsTree.verify(proof, leaf, root))
    res.send({
      "id": req.params.id,
      "leaf": leaf,
      "proof": proof,
    })
})

router.get('/nodeKeys', (req, res) => {
    const i_inicial = req.query.i_inicial
    const i_final = req.query.i_final
    if(!i_inicial || !i_final){
        res.send("Missing parameters i_inicial and i_final")
        return
    }

    const leaves = infoBUsTree.getHexLeaves().map(leaf => {
        return {
            leaf: leaf.leaf,
            vote: JSON.parse(leaf.vote)
        }
    })
    const nodeKeys = resultProof.nodeKeys(leaves, parseInt(i_inicial), parseInt(i_final))
    
    res.send(nodeKeys)
})

router.post('/proof', (req, res) => {
    // returns proof
    const root = infoBUsTree.getRoot()
    console.log(req.body.leaf)
    const leaf = {
        leaf: SHA256(JSON.stringify(req.body.leaf)).toString(), 
        vote: new Array(req.body.leaf.votos_validos.map(candidato => ([candidato.nome, candidato.votos])))
    }
    console.log(infoBUsTree.toString())
    console.log(leaf)
    const proof = infoBUsTree.getProof(leaf)
    if (infoBUsTree.verify(proof, leaf, root)){
      res.json(proof)
    }
    else{
      res.send('Proof not found')
    }
  })

module.exports = router