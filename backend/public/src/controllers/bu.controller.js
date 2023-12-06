const router = require('express').Router();
const bu_repository = require('../database/repository/bu.repository');

router.get("/find_by_merkletree_index_range", async  (req, res) => {
  const election_id = req.query.election_id
  const initial_index = req.query.initial_index
  const final_index = req.query.final_index
  
  console.info(`[bu.controller] GET /find_by_merkletree_index_range ${election_id} ${initial_index} ${final_index}`)

  const data = await bu_repository.findByMerkletreeIndexRange(election_id, initial_index, final_index)

  res.json(data)
})
 
router.get("/find_by_id", async (req, res) => {
  const id = req.query.id
  
  console.info(`[bu.controller] GET /find_by_id ${id}`)

  const data = await bu_repository.findById(id)
  
  res.json(data)
})

router.get("/find_by_info", async (req, res) => {
  const id = req.query.id_eleicao
  const UF = req.query.UF
  const zona = req.query.zona
  const secao = req.query.secao
  
  console.info(`[bu.controller] GET /find_by_info ${id} ${UF} ${zona} ${secao}`)

  const data = await bu_repository.findByInfo(id, UF, zona, secao)

  res.json(data)
})

router.get("/distinct_eleicoes", async (req, res) => {
  console.info(`[bu.controller] GET /distinct_eleicoes`)
  const data = await bu_repository.findDistinctEleicoes()
  res.json(data)
})

router.get("/distinct_uf", async (req, res) => {
  console.info(`[bu.controller] GET /distinct_uf`)
  const id = req.query.id_eleicao
  const data = await bu_repository.findDistinctUF(id)
  res.json(data)
})

router.get("/distinct_zona", async (req, res) => {
  console.info(`[bu.controller] GET /distinct_zona`)
  const id = req.query.id_eleicao
  const UF = req.query.UF
  const data = await bu_repository.findDistinctZona(id, UF)
  res.json(data)
})

router.get("/distinct_secao", async (req, res) => {
  console.info(`[bu.controller] GET /distinct_secao`)
  const id = req.query.id_eleicao
  const UF = req.query.UF
  const zona = req.query.zona
  const data = await bu_repository.findDistinctSecao(id, UF, zona)
  res.json(data)
})
  
module.exports = router;
