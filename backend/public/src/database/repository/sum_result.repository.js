const mongoose = require("mongoose");
const { schema_sum_result } = require("../models/sum_result.model");
const repository = mongoose.model("sum_result", schema_sum_result);

exports.findByInfo = async (estado, id_eleicao, cargo, municipio) => {
  if (municipio) {
    return await repository
      .findOne({
        estado,
        id_eleicao,
        cargo,
        municipio_code: parseInt(municipio, 10),
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(`[ERROR][sum_result.repository] ${err}`);
      });
  }
  return await repository
    .findOne({
      estado,
      id_eleicao,
      cargo,
      municipio_code: { $eq: null },
      municipio: { $eq: null },
      // municipio: null,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(`[ERROR][sum_result.repository] ${err}`);
    });
};

exports.findDistinctEleicoes = async () => {
  return await repository
    .distinct("id_eleicao")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(`[ERROR][sum_result.repository] ${err}`);
    });
};

exports.findDistinctUF = async (id_eleicao) => {
  return await repository
    .find({ id_eleicao: id_eleicao })
    .distinct("estado")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(`[ERROR][sum_result.repository] ${err}`);
    });
};

exports.findDistinctCargos = async (id_eleicao, estado) => {
  return await repository
    .find({ id_eleicao, estado })
    .distinct("cargo")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(`[ERROR][sum_result.repository] ${err}`);
    });
};

exports.findDistinctMunicipio = async (id_eleicao, estado) => {
  return await repository
    .aggregate([
      {
        $match: {
          id_eleicao: parseInt(id_eleicao, 10),
          estado,
          result: {
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: {
            municipio: "$municipio",
            municipio_code: "$municipio_code",
          },
        },
      },
      {
        $sort: {
          "_id.municipio": 1, // Sort by municipio in ascending order. Use -1 for descending order.
        },
      },
    ])
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(`[ERROR][bu.repository] ${err}`);
    });
};
