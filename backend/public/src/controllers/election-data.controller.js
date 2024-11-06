const router = require('express').Router();
const election_data_repository = require('../database/repository/election-data.repository');

router.get("/find_by_merkletree_index_range", async  (req, res) => {
  const tree_name = req.query.tree_name
  const initial_index = req.query.initial_index
  const final_index = req.query.final_index
  
  console.info(`[election-data.controller] GET /find_by_merkletree_index_range ${tree_name} ${initial_index} ${final_index}`)

  const data = await election_data_repository.findByMerkletreeIndexRange(tree_name, initial_index, final_index)

  res.json(data)
})
 
router.get("/find_by_id", async (req, res) => {
    const id = req.query.id
    const tree_name = req.query.tree_name

    console.info(`[election-data.controller] GET /find_by_id ${tree_name} ${id}`)

    const data = await election_data_repository.findById(tree_name, id)

    res.json(data)
})

router.get("/find_by_filename", async (req, res) => {
    const filename = req.query.filename
    const tree_name = req.query.tree_name

    console.info(`[election-data.controller] GET /find_by_filename ${tree_name} ${filename}`)

    const data = await election_data_repository.findByFilename(tree_name, filename)

    res.json(data)
})

router.get("/download", async (req, res) => {
    const id = req.query.id
    const tree_name = req.query.tree_name

    console.info(`[election-data.controller] GET /download ${tree_name} ${id}`)

    const data = await election_data_repository.findById(tree_name, id)

    if (!data) {
      res.status(404).send('Not Found')
      return
    }

    const buffer = Buffer.from(data.data, 'base64')
    res.setHeader('Content-Disposition', `attachment; filename=${data.filename}`)

    res.send(buffer)
})

module.exports = router;
