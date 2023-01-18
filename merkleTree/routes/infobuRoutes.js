const router = require('express').Router()
const { MerkleTreePrefix } = require('../lib/MerkleTreePrefix')
const { SHA256 } = require('crypto-js')
const { nodeKeys } = require('../controllers/nodeKeys.controller')

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
    const root = infoBUsTree.getRoot()
    res.send(root)
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

    const leaves = infoBUsTree.getLayers()[0]    
    res.send(nodeKeys(leaves, parseInt(i_inicial), parseInt(i_final)))
})

router.post('/proof', (req, res) => {
    // returns proof
    const data = []
    for (let index = 0; index < req.body.leaves.length; index++) {
        const leaf = {
            leaf: req.body.leaves[index].merkletree_leaf,
            vote: req.body.leaves[index].votos_validos.map(candidato => ([candidato.nome, candidato.votos]))
        }
        const proof = infoBUsTree.getProof(leaf)
        if(proof)
            data.push({
                leaf: leaf,
                proof: infoBUsTree.getProof(leaf)
            })
        else
            data.push({
                leaf: leaf,
                proof: 'Proof not found'
            })
    }

    res.json(data)
})

router.get('/resultProof', (req, res) => {
    // returns proof
    const i_inicial = req.query.i_inicial
    const i_final = req.query.i_final
    if(!i_inicial || !i_final){
        res.send("Missing parameters i_inicial and i_final")
        return
    }
    const nodes = nodeKeys(infoBUsTree.getLayers()[0], parseInt(i_inicial), parseInt(i_final))
    const proofs = []
    nodes.map(key => {
        const node = infoBUsTree.getNode(key.index, key.depth)
        const proof = infoBUsTree.getProof(node, key.index, key.depth)
        if(proof)
            proofs.push({
                leaf: node,
                coordinates: key,
                proof: proof
            })
        else
            proofs.push({
                leaf: node,
                coordinates: key,
                proof: 'Proof not found'
            })
    })
     
    res.json(proofs)
})

router.get('/modify', (req, res) => {
    const index = parseInt(req.query.index)
    let depth = req.query.depth
    if(!depth)
        depth = 0
    else
        depth = parseInt(depth)

    const vote = [['Candidado A', 1000], ['Candidado B', 1000]]
    
    infoBUsTree.modifyNode(vote, index, depth)

    res.send(infoBUsTree.getNode(index, depth))
})

module.exports = router