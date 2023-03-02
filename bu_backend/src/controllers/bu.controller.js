const { modeloBoletim } = require("../models/bu.model")
const { modeloroot } = require("../models/root.model")

const merkletree_adapter = require("../adapters/bus_merkletree.adapter")

const CONSISTENCY_PROOF_FREQUENCY = 16
let tree_size_1 = 0, tree_size_2 = 0, log_id = 0

// Create and Save a new BU
exports.create = (data) => {
  buString = JSON.stringify(data.bu_inteiro)
  console.log(typeof buString);
  console.log("Debug BU")
  console.log(buString)
  console.log({"BU": data})

  merkletree_adapter.addLeaf(buString).then((merkletree_data) => {
    modeloBoletim.create({
      merkletree_leaf_index: merkletree_data.leaf_index,
      merkletree_leaf: merkletree_data.added_leaf,
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

    tree_size_2++ 
    if(tree_size_2 % CONSISTENCY_PROOF_FREQUENCY == 0){
      storeConsistencyProof(tree_size_1, tree_size_2, log_id)
      tree_size_1 = tree_size_2
      log_id++
    }
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

// Find BU by BU info
exports.findByInfo = (turno,UF,secao,zona) =>{
  return modeloBoletim.findOne({turno:turno, UF:UF, secao:secao, zona:zona})
  .then((data) =>{
      return data;
  }) 
}

exports.Sum = () => {
  return modeloBoletim.modeloBoletim.aggregate([
    {$unwind:"$votos"},
    {$group:{
      _id:"$votos.nome",
      votos:  {$sum: "$votos.votos"}
    }}]).then((data)=>{
      return data;
    })
};

/**
* publishConsistencyProof
* @desc - Processa e armazena prova de consistência
*/
function storeConsistencyProof(tree_size_1, tree_size_2, log_id){
  merkletree_adapter.getProof(tree_size_1, tree_size_2).then(({proof_path, first_tree_hash, second_tree_hash}) => {  
    modeloroot.create({
      _id:log_id,
      tree_size_1: tree_size_1,
      tree_size_2: tree_size_2,
      first_hash: first_tree_hash, 
      second_hash: second_tree_hash,
      consistency_path: proof_path,
      log_id: log_id
    })
    console.log("\n\Armazenado prova de consistência")
  })
}