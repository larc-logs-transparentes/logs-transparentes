const router = require('express').Router();
const tree_service = require('../services/tree.service');

/**
 * POST to commit all trees
 */
router.post("/commit-all-trees", async (req, res) => {
  console.info(`[bu.controller] POST /commit-all-trees`)

  const response = await tree_service.commitAllTree()

  res.json(response)
})
  
module.exports = router;
