const router = require('express').Router();
const bu_repository = require('../database/repository/bu.repository');
const bu_service = require('../services/bu.service');

router.get("/find_all", async (req, res) => {
  console.info(`[bu.controller] GET /find_all`)

  const data = await bu_repository.findAll()
  
  res.json(data)
})
  
router.get("/find_by_id_range", async  (req, res) => {
  const initial_id = req.query.id_inicial
  const final_id = req.query.id_final
  
  console.info(`[bu.controller] GET /find_by_id_range ${initial_id} ${final_id}`)

  const data = await bu_repository.findByIdRange(initial_id, final_id)

  res.json(data)
})
  
router.get("/find_by_id", async (req, res) => {
  const id = req.query.id
  
  console.info(`[bu.controller] GET /find_by_id ${id}`)

  const data = await bu_repository.findById(id)
  
  console.info(`[bu.controller] GET /find_by_id ${JSON.stringify(data)}`)
  res.json(data)
})

router.get("/find_by_info", async (req, res) => {
  const turno = req.query.turno
  const UF = req.query.UF
  const zona = req.query.zona
  const secao = req.query.secao
  
  console.info(`[bu.controller] GET /find_by_info ${turno} ${UF} ${zona} ${secao}`)

  const data = await bu_repository.findByInfo(turno, UF, zona, secao)

  res.json(data)
})

router.post("/create", async (req, res) => {
  const tree_name = req.body.tree_name
  const data = req.body.data

  console.info(`[bu.controller] POST /create ${tree_name}`)
  
  const response = await bu_service.create(tree_name, data) 

  res.json(response)
})
  
module.exports = router;