const { modeloInfoBU } = require("../models/bu.model")
const { findAll: findAllBUs } = require("./bu.controller")

const infobu_merkletree_adapter = require('../adapters/infobus_merkletree.adapter')
const { SHA256 } = require("crypto-js")

exports.findByIdRange = async (id, id_final) => {
    const data = await modeloInfoBU.find({ id: { $gte: id, $lte: id_final } })
    data.sort((a, b) => a.id - b.id)
    return data
}

exports.initialize = async () => {
    const folhas = []

    console.log("inicializando árvore de infoBUs")
    const BUs = await findAllBUs()    
    const BUsOrdenados = BUs.sort((a, b) => { return a.id - b.id })
    for (let index = 0; index < BUsOrdenados.length; index++) {
        var BU = BUsOrdenados[index]
        let infoBU = {
            _id: BU.id,
            id: BU.id,
            secao: BU.secao,
            zona: BU.zona,
            UF: BU.UF,
            turno: BU.turno,
            cidade: BU.cidade,
            bu_inteiro: BU.bu_inteiro,
            regras_aplicadas: null,
            votos_validos: BU.votos,
            indice_na_arvore_de_BUs: parseInt(BU.merkletree_leaf_index),
        }
        console.log(JSON.stringify(infoBU))
        folhas.push(infoBU)
        modeloInfoBU.create({
            ...infoBU,
            merkletree_index: index,
            merkletree_leaf: SHA256(JSON.stringify(infoBU)).toString(),
        })  
    }
    
    await infobu_merkletree_adapter.sendLeaves(folhas)
    return {
        message: "árvore de infoBUs inicializada"
    }
}