const router = require('express').Router()
const { MerkleTreePrefix } = require('../merkletreejs/dist/MerkleTreePrefix')

const { SHA256 } = require('crypto-js')
const infoBUsTree = new MerkleTreePrefix([], SHA256)

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
    console.log(leaves[0].vote) /* [[ 'Candidado A', 41 ], [ 'Candidado B', 109 ]] */
    infoBUsTree.addLeaves(leaves)
    return res.json(req.body)
})

router.get('/', (req, res) => {
    console.log(infoBUsTree.toString())
    console.log("tree leaves: ", infoBUsTree.getLeafCount())
    console.log(infoBUsTree.getHexLayersFlat())
    res.send(infoBUsTree.getHexLayers())
})

router.get('/root', (req, res) => {
    const root = infoBUsTree.getRoot().toString('hex')
    console.log(root)
    res.send(root)
})

router.get('/leaves', (req, res) => {
    if(req.query.id === undefined){
        const leaves = infoBUsTree.getHexLeaves()
        console.log(leaves)
        res.send(leaves.map(leaf => {return {"hash": leaf}}))
        return
    }

    const leaf = infoBUsTree.getLeaf(req.query.id).toString('hex')
    console.log(leaf)
    res.send({
      "id": req.query.id,
      "leaf": leaf,
    })
})
  
router.get('/leaf/:id', (req, res) => {
    // Return a leaf with id equals to id and its proof.
    const leaf = infoBUsTree.getLeaf(req.params.id).toString('hex')
    const root = infoBUsTree.getRoot()
    const proofHex = infoBUsTree.getHexProof(leaf)
    const proof = infoBUsTree.getProof(leaf)
    console.log(proof)
    console.log(infoBUsTree.verify(proof, leaf, root))
    res.send({
      "id": req.params.id,
      "leaf": leaf,
      "proof": proof,
      "proofHex": proofHex
    })
})

module.exports = router