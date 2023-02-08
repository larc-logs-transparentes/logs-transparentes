const express = require('express')
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const consistencyProof = require('./controllers/consistencyProof.controller')

const app = express()
app.use(express.json())

const port = 3001
//mudar a funcao de hash
const tree = new MerkleTree([], SHA256)

app.get('/', (req, res) => {
  res.send('Hello World!' + tree.toString())
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log(req.body.leaves)
  const leaves = req.body.leaves 
  tree.addLeaves(leaves.map(x => SHA256(x)))
  console.log(tree.toString())
  res.json(req.body);
})

app.post('/tree/leaf', (req, res) => {
  console.log(req.body)
  // console.log(req.body.leaf)
  const leaf = req.body.leaf 
  const leafString = JSON.stringify(req.body.leaf)
  console.log({leafString})
  tree.addLeaf(SHA256(leafString))
  const leaf_index = tree.getLeafIndex(SHA256(leafString))
  const added_leaf = tree.getLeaf(leaf_index).toString('hex')
  console.log({leaf_index})
  console.log({added_leaf})
  res.json({
    "leaf_index": leaf_index,
    "added_leaf": added_leaf,
    ...req.body
  });
})


app.post('/proof', (req, res) => {
  // returns proof
  const root = tree.getRoot().toString('hex')
  const leaf = SHA256(req.body.leaf)
  const proof = tree.getProof(leaf)
  if (tree.verify(proof, leaf, root)){
    res.json(proof)
  }
  else{
    res.send('Proof not found' + tree.toString())
  }
})

// TODO: precisa definir se sera esse formato de retorno
// tree.getLayersAsObject() ou tree.getHexLayersFlat() tambem podem ser uma opçao 
app.get('/tree', (req, res) => {
  console.log(tree.toString())
  console.log("tree leaves: ", tree.getLeafCount())
  console.log(tree.getHexLayersFlat())
  res.send(tree.getHexLayers())
})

app.get('/tree/root', (req, res) => {
  // TODO: em vez de hexa usar base64
  const root = tree.getRoot().toString('hex')
  console.log(root)
  res.send(root)
})

app.get('/tree/proof', (req, res) => {
  if(req.query.final === undefined)
    final = tree.getLeafCount()
  else
    final = req.query.final
  console.log(`Prova de consistência com initial = ${req.query.initial} e final = ${final}`)
  res.send(consistencyProof.proof(req.query.initial, tree.getHexLeaves().slice(0, final)))
})

app.get('/tree/leaf/:id', (req, res) => {
  // Return a leaf with id equals to id and its proof.
  const leaf = tree.getLeaf(req.params.id).toString('hex')
  const root = tree.getRoot()
  const proofHex = tree.getHexProof(leaf)
  const proof = tree.getProof(leaf)
  console.log(proof)
  console.log(tree.verify(proof, leaf, root))
  res.send({
    "id": req.params.id,
    "leaf": leaf,
    "proof": proof,
    "proofHex": proofHex
  })
})

app.get('/leaf/:id', (req, res) => {
  // Return a leaf with id equals to id without its proof.
  const leaf = tree.getLeaf(req.params.id).toString('hex')
  console.log(leaf)
  res.send({
    "id": req.params.id,
    "leaf": leaf,
  })
})

app.get('/tree/leaves', (req, res) => {
  const leaves = tree.getHexLeaves()
  console.log(leaves)
  res.send(leaves.map(leaf => {return {"hash": leaf}}))
})

const infobuRoutes = require('./routes/infobuRoutes')
app.use('/infobus', infobuRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})