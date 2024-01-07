const router = require("express").Router()
const tlmanager_adapter = require("../adapters/tlmanager.adapter")

/* TLManager routes */
/* Tree routes */
router.get("", async (req, res) => {
  const tree_name = req.query.tree_name

  if (tree_name) {
    console.info(`[tree.controller] GET tree: ${tree_name}`)

    const response = await tlmanager_adapter.getTree(tree_name)
    res.json(response)
  } else {
    console.info(`[tree.controller] GET trees`)

    const response = await tlmanager_adapter.getTrees()
    res.json(response)
  }
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

router.get("/all-leaf-data-global-tree", async (req, res) => {
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
