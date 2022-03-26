const express = require('express')
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
var bodyParser = require('body-parser');

const app = express()
app.use(express.json())
const port = 3000
//mudar a funcao de hash
const tree = new MerkleTree([], SHA256)


app.get('/', (req, res) => {
  res.send('Hello World!' + tree.toString())
})


app.put('/', (req, res) => {
  console.log(req.body)
  
  console.log(req.body.leaves)
  //const leaves = req.leaves 
  //tree.addLeaves(leaves)
  res.json(req.body);
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log(req.body.leaves)
  const leaves = req.body.leaves 
  tree.addLeaves(leaves.map(x => SHA256(x)))
  console.log(tree.toString())
  res.json(req.body);
})

app.post('/proof', (req, res) => {
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


app.get('/tree', (req, res) => {
  console.log(tree.toString())
  res.send(tree.toString)
})

app.get('/treeleaves', (req, res) => {
  const leaves = tree.getLeaves()
  console.log(leaves)
  res.send(leaves)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})