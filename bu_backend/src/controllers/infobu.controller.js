const modeloBoletim = require("../models/bu.model")
const merkletree_adapter = require("../adapters/merkletree.adapter")
const { SHA256 } = require("crypto-js")

exports.findById = async (id) => {
    console.log({id})
    const data = await modeloBoletim.modeloInfoBU.findOne({ id: id })
    return data
}

exports.inicializar = async () => {
    const folhas = []

    const BUs = await modeloBoletim.modeloBoletim1.find({})
    const BUsOrdenados = BUs.sort((a, b) => { return a.id - b.id })
    for (let index = 0; index < BUsOrdenados.length; index++) {
        var BU = BUsOrdenados[index]
        let infoBU = {
            id: BU.id,
            secao: BU.secao,
            zona: BU.zona,
            UF: BU.UF,
            turno: BU.turno,
            regras_aplicadas: null,
            votos_validos: BU.votos,
            indice_na_arvore_de_BUs: BU.merkletree_leaf_id,
        }
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
      
    /* 
     const testLeaf : TLeafPref = {leaf: ll , vote: myMap}
      const myMap = new Array<Array<[string, number]>>([
        ["key1", 1],
        ["key2", 2]
      ]); 
    */