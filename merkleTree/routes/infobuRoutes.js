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
  
module.exports = router