const router = require("express").Router();
const sum_result_repository = require("../database/repository/sum_result.repository");

router.get("/find_by_info", async (req, res) => {
  const estado = req.query.estado;
  const id_eleicao = req.query.id_eleicao;
  const cargo = req.query.cargo;
  const municipio = req.query.municipio;

  console.info(
    `[bu.controller] GET /find_by_info ${estado} ${id_eleicao} ${cargo} ${municipio}`
  );

  const data = await sum_result_repository.findByInfo(
    estado,
    id_eleicao,
    cargo,
    municipio
  );

  res.json(data);
});

router.get("/distinct_eleicoes", async (req, res) => {
  const data = await sum_result_repository.findDistinctEleicoes();
  res.json(data);
});

router.get("/distinct_uf", async (req, res) => {
  console.info(`[bu.controller] GET /distinct_uf`);
  const id = req.query.id_eleicao;
  const data = await sum_result_repository.findDistinctUF(id);
  res.json(data);
});

router.get("/distinct_cargos", async (req, res) => {
  const id = req.query.id_eleicao;
  const estado = req.query.estado;
  const data = await sum_result_repository.findDistinctCargos(id, estado);
  res.json(data);
});

router.get("/distinct_municipio", async (req, res) => {
  const id = req.query.id_eleicao;
  const estado = req.query.estado;
  console.info(
    `[bu.controller] GET /distinct_municipio?id_eleicao=${id}&estado=${estado}`
  );
  const data = await sum_result_repository.findDistinctMunicipio(id, estado);
  res.json(data);
});

module.exports = router;
