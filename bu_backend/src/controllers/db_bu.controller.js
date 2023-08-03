const { modeloBoletim } = require("../models/bu.model")

exports.insertBU = (data, merkletree_leaf_data) => {
    modeloBoletim.create({
        merkletree_leaf_index: merkletree_leaf_data.index,
        merkletree_leaf: merkletree_leaf_data.value,
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
    return
}

exports.findAll = async () => {
    const data = await modeloBoletim.find({})
    return data
};

exports.findById = async (id) => {
    console.log({id})
    const data = await modeloBoletim.findOne({ id: id });
    return data;
};

exports.findByInfo = async (turno, UF, zona, secao) => {
    const data = await modeloBoletim.findOne({ turno: turno, UF: UF, zona: zona, secao: secao });
    return data;
};

exports.findTotalVotesByIdRange = (id_inicial, id_final) => {
    return modeloBoletim.find({id:{ $gte:id_inicial, $lte:id_final}})
    .then((data) => {
        return totalizarvotos(data)
    })
};
exports.findDistinctUF = async () => {
    const distinctUFs = await modeloBoletim.distinct('UF');
    return distinctUFs;
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