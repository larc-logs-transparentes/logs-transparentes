const router = require('express').Router();
const bu_repository = require('../database/repository/bu.repository');
const bu_service = require('../services/bu.service');

/**
 * POST that receive a bus parsed in JSON and insert it in the database and in the correct tree
 */
router.post("/create", async (req, res) => {
  const bu = req.body.bu

  console.info(`[bu.controller] POST /insert`)

  const response = await bu_service.create(bu)

  res.json(response)
})
  
module.exports = router;
