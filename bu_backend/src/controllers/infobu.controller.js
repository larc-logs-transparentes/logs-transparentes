const modeloBoletim = require("../models/bu.model")
const merkletree_adapter = require("../adapters/merkletree.adapter")
const { SHA256 } = require("crypto-js")

exports.findAll = async () => {
    const data = await modeloBoletim.modeloInfoBU.find({})
    return data
}

exports.findById = async (id) => {
    console.log({id})
    const data = await modeloBoletim.modeloInfoBU.findOne({ id: id })
    return data
}

exports.findByIdRange = async (id, id_final) => {
    const data = await modeloBoletim.modeloInfoBU.find({ id: { $gte: id, $lte: id_final } })
    data.sort((a, b) => a.id - b.id)
    return data
}

exports.inicializar = async () => {
    const folhas = []

    const BUs = await modeloBoletim.modeloBoletim.find({})
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
            regras_aplicadas: null,
            votos_validos: BU.votos,
            indice_na_arvore_de_BUs: parseInt(BU.merkletree_leaf_index),
        }
        console.log(JSON.stringify(infoBU))
        folhas.push(infoBU)
        modeloBoletim.modeloInfoBU.create({
            ...infoBU,
            merkletree_index: index,
            merkletree_leaf: SHA256(JSON.stringify(infoBU)).toString(),
        })  
    }
    
    await merkletree_adapter.infoBUs_sendLeaves(folhas)
    return {
        message: "árvore de infoBUs inicializada"
    }
}