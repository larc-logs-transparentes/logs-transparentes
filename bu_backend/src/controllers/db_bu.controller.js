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
exports.findDistinctTurno = async () => {
  const turno = await modeloBoletim.find().distinct("turno");
  console.log('certeza')
  return turno;
};
exports.findDistinctUF = async (turno) => {
  const distinctUFs = await modeloBoletim.find({ 'turno': turno }).distinct("UF");
  return distinctUFs;
};

exports.findDistinctZona = async (turno, uf) => {
  const distinctZonas = await modeloBoletim.find({ 'turno': turno, 'UF': uf }).distinct("zona");
  return distinctZonas;
};

exports.findDistinctSecao = async (turno, uf, zona) => {
  const distinctSecoes = await modeloBoletim.find({ 'turno': turno, 'UF': uf, 'zona': zona }).distinct("secao");
  return distinctSecoes;
};



  exports.findByUF = async (UF) => {
    try {
      const BUS = await modeloBoletim.find({ 'UF': UF,'turno': turno } && { 'turno': turno});
      return BUS;
    } catch (error) {
      throw error;
    }
  };
  exports.findByTurno = async (turno) => {
    try {
      const BUS = await modeloBoletim.find({ 'turno': turno});
      return BUS;
    } catch (error) {
      throw error;
    }
  };
  exports.consultBU = async (turno, UF, zona, secao) => {
    try {
      const buses = await modeloBoletim.find({
        'turno': turno,
        'UF': UF,
        'zona': zona,
        'secao': secao
      });
  
      return buses;
    } catch (error) {
      throw error;
    }
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