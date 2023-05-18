const { modeloBoletim } = require("../models/bu.model")
const { modeloroot } = require("../models/root.model")

const merkletree_adapter = require("../adapters/bus_tlmanager.adapter")

// Create and Save a new BU
exports.create = (tree_name, data) => {
  buString = JSON.stringify(data.bu_inteiro)
  console.log(typeof buString);
  console.log("Debug BU")
  console.log(buString)
  console.log({"BU": data})

  merkletree_adapter.addLeaf(tree_name, buString).then((merkletree_data) => {
    modeloBoletim.create({
      merkletree_leaf_index: merkletree_data.index,
      merkletree_leaf: merkletree_data.value,
      _id: data._id,
      id: data.id,
      turno: data.turno,
      UF: data.UF,
      zona: data.zona,
      cidade: data.cidade,
      secao: data.secao,
      bu_inteiro: JSON.stringify(data.bu_inteiro),
      votos: data.votos,
    })
  })
  return
};

function totalizarvotos(data) {
  const totaldevotos = []
    for (let i = 0; i < data.length; i++) { //percorre BUs
        const candidatos = data[i].votos;
        for (let j = 0; j < candidatos.length; j++) { //percorre registros dos candidatos em um BU
            const element = candidatos[j];
            let aux = totaldevotos.findIndex(candidato => candidato.nome == element.nome)
            
            if(aux != -1) //se encontrado candidato no array
                totaldevotos[aux].votos += element.votos //soma os votos
            else
                totaldevotos.push(element) //insere no array
        } 
    }

  totaldevotos.sort((a, b) => b.nome - a.nome) //ordena por nome do candidato
  console.log('Resultado Final')
  console.log(totaldevotos)
  return totaldevotos
}

// Retrieve all BUs from the database.
exports.findAll = async () => {
  const data = await modeloBoletim.find({})
  return data
};

// Find BUs inside a ID range.
exports.findTotalVotesByIdRange = (id_inicial, id_final) => {
  return modeloBoletim.find({id:{ $gte:id_inicial, $lte:id_final}})
  .then((data) => {
    return totalizarvotos(data)
  })
};

// Find a single BU with an id
exports.findById = (id) => {
  console.log({id})
  return modeloBoletim.findOne({id: id}).then((data) => {
    return data
  })
};

exports.createTree = async (tree_name, commitment_size) => {
  return await merkletree_adapter.createTree(tree_name, commitment_size)
}

exports.getDataProof = async (leaf_index) => {
  return await merkletree_adapter.getDataProof("bu_tree", leaf_index)
}

exports.getConsistencyProof = async () => {
  return await merkletree_adapter.getConsistencyProof("bu_tree")
}

exports.commit = async () => {
  return await merkletree_adapter.commit("bu_tree")
}