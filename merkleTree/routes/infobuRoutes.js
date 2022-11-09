const router = require('express').Router()
const { MerkleTreePrefix } = require('../merkletreejs/dist/MerkleTreePrefix')

const { SHA256 } = require('crypto-js')
const infoBUsTree = new MerkleTreePrefix([], SHA256, {fillDefaultHash: true})

router.post('/leaves', (req, res) => {
    const infoBUs = req.body.data
    const leaves = []

    for (let index = 0; index < infoBUs.length; index++) {
        const infoBU = infoBUs[index];
        leaves.push({
            leaf: SHA256(JSON.stringify(infoBU)).toString(),
            vote: new Array(infoBU.votos_validos.map(candidato => ([candidato.nome, candidato.votos])))
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

module.exports = router