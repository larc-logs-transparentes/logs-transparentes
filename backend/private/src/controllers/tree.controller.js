const router = require("express").Router()
const tlmanager_adapter = require("../adapters/tlmanager.adapter")

/* TLManager routes */
/* admin routes */
router.post("/insert-leaf", async (req, res) => {
  const tree_name = req.body.tree_name
  const data = req.body.data

  console.info(`[tree.controller] POST insert-leaf: ${tree_name} ${data}`)

  const response = await tlmanager_adapter.addLeaf(tree_name, data)
  res.json(response)
})

router.post("/create-tree", async (req, res) => {
  const tree_name = req.body.tree_name
  const commitment_size = req.body.commitment_size

  console.info(`[tree.controller] POST create-tree: ${tree_name} ${commitment_size}`)

  const response = await tlmanager_adapter.createTree(tree_name, commitment_size)
  res.json(response)
})

router.post("/commit", async (req, res) => {
  const tree_name = req.body.tree_name

  console.info(`[tree.controller] POST commit: ${tree_name}`)

  const response = await tlmanager_adapter.commit(tree_name)
  res.json(response)
})

/* Tree routes */
router.get("", async (req, res) => {
  const tree_name = req.query.tree_name

  console.info(`[tree.controller] GET tree: ${tree_name}`)

  const response = await tlmanager_adapter.getTree(tree_name)
  res.json(response)
})

router.get("/tree-root", async (req, res) => {
  const tree_name = req.query.tree_name

  console.info(`[tree.controller] GET tree-root: ${tree_name}`)

  const response = await tlmanager_adapter.getTreeRoot(tree_name)
  res.json(response)
})

router.get("/all-roots-global-tree", async (req, res) => {
  console.info(`[tree.controller] GET all-roots-global-tree`)

  const response = await tlmanager_adapter.getAllRoots()
  res.json(response)
})

router.get("/global-tree/all-leaf-data", async (req, res) => {
    console.info(`[tree.controller] GET global-tree/all-leaf-data`)

    const response = await tlmanager_adapter.getGlobalTreeAllLeafData()
    res.json(response)
})

/* Proofs routes */
router.get("/all-consistency-proof", async (req, res) => {
  const tree_name = req.query.tree_name

  console.info(`[tree.controller] GET all-consistency-proof: ${tree_name}`)

  const response = await tlmanager_adapter.getConsistencyProof(tree_name)
  res.json(response)
})

router.get("/data-proof", async (req, res) => {
  const tree_name = req.query.tree_name
  const index = req.query.index

  console.info(`[tree.controller] GET data-proof: ${tree_name} ${index}`)

  const response = await tlmanager_adapter.getDataProof(tree_name, index)
  res.json(response)
})

router.get("/inclusion-proof", async (req, res) => {
  const tree_name = req.query.tree_name
  const index = req.query.index

  console.info(`[tree.controller] GET inclusion-proof: ${tree_name} ${index}`)

  const response = await tlmanager_adapter.getInclusionProof(tree_name, index)
  res.json(response)
})

module.exports = router
