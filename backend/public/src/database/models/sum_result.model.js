const mongoose = require("mongoose");

const schema_sum_result = new mongoose.Schema({
  result: String,
  identifier: String,
  id_eleicao: Number,
  estado: String,
  cargo: String,
  municipio: { type: String, default: null },
  municipio_code: { type: Number, default: null },
});

module.exports = { schema_sum_result };
