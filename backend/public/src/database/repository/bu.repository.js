const mongoose = require("mongoose");
const { schema_bu } = require("../models/bu.model")

const repository = mongoose.model("bu", schema_bu)

exports.findById = async (id) => {    
    return await repository.findOne({ _id: id })
    .then((data) => {
        data._doc.bu = Buffer.from(data.bu, 'base64').toString('base64')
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findByMerkletreeIndexRange = async (id_eleicao, initial_index, final_index) => {
    return await repository.find({ [ `merkletree_info.${id_eleicao}.index` ]: { $gte: initial_index, $lte: final_index } } )
        .then((data) => {
            return data.map((bu) => {
                bu._doc.bu = Buffer.from(bu.bu, 'base64').toString('base64')
                return bu
            })
        })
        .catch((err) => {
            console.error(`[ERROR][bu.repository] ${err}`)
        })
}

exports.findByInfo = async (UF, zona, secao) => {
    return await repository.findOne({ UF: UF, zona: zona, secao: secao })
    .then((data) => {
        data._doc.bu = Buffer.from(data.bu, 'base64').toString('base64')
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}


exports.findDistinctEleicoes = async () => {
    return await repository.distinct("eleicoes")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}
exports.findDistinctUF = async (id_eleicao) => {
    return await repository.find({ 'eleicoes': id_eleicao }).distinct("UF")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findDistinctMunicipio = async (id_eleicao, uf) => {
    return await repository.find({ 'eleicoes': id_eleicao, 'UF': uf }).distinct("municipio")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}

exports.findDistinctZona = async (id_eleicao, uf, municipio) => {
    return await repository.find({ 'eleicoes': id_eleicao, 'UF': uf, 'municipio': municipio }).distinct("zona")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    }
)}

exports.findDistinctSecao = async (id_eleicao, uf, zona, municipio) => {
    return await repository.find({ 'eleicoes': id_eleicao, 'UF': uf, 'municipio': municipio, 'zona': zona }).distinct("secao")
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.error(`[ERROR][bu.repository] ${err}`)
    })
}