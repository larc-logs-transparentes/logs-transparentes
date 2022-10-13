const router = require('express').Router()
const { MerkleTreePrefix } = require('../merkletreejs/src/MerkleTreePrefix')
//import MerkleTreePrefix from '../merkletreejs/src/MerkleTreePrefix'

const { SHA256 } = require('crypto-js')
const infoBUsTree = new MerkleTreePrefix([], SHA256)

router.post('/leaves', (req, res) => {
    const infoBUs = req.body
    const leaves = []

    for (let index = 0; index < infoBUs.length; index++) {
        const infoBU = infoBUs[index];
        leaves.push({
            leaf: SHA256(JSON.stringify(infoBU)),
            vote: infoBU.votos_validos
        })
    }
    
    infoBUsTree.addLeaves(leaves)
    return res.json(infoBUsTree.toString())
})
  
module.exports = router