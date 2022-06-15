const axios = require('axios')
const merkletree_adapter = require("../adapters/merkletree.adapter")
const merkletree_api = require("./api/merkletree.api")

const backendHostname = "http://localhost"
const backendPort = 8080
main().finally(() => {
    process.exit()
})

async function main(bb){
    console.log("Download de BUs iniciado")
    const BUs = await baixarBUs()
    console.log("Download de " + BUs.length + " BUs terminado")

    console.log(await verificarBUs(BUs))
    console.log(retotalizar(BUs))
    bb=BUs.length
    return
}

async function baixarBUs(){
    return await axios.get(`${backendHostname}:${backendPort}/bu/get_all`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

async function verificarBUs(BUs){ 
    return {
        verificacao_inclusao: await verificarInclusao(BUs),
        verificacao_qtd: await verificarQtdBUS(BUs)
    }
}

async function verificarQtdBUS(BUs){
    return await merkletree_adapter.getAllLeaves()
    .then(leaves => {
        return leaves.length == BUs.length
    })
    .catch((err) => {
        console.log(err)
    })
}

async function verificarInclusao(BUs){
    for (let i = 0; i < BUs.length; i++) { //percorre BUs
        const res = await merkletree_api.verify(BUs[i].id)
        if(!res.isTrue)
            return false
    }
    return true
}

function retotalizar(BUs){
    const ret = []
    for (let i = 0; i < BUs.length; i++) { //percorre BUs
        const candidatos = BUs[i].votos;
        for (let j = 0; j < candidatos.length; j++) { //percorre registros dos candidatos em um BU
            const element = candidatos[j];
            let aux = ret.findIndex(candidato => candidato.nome == element.nome)
            if(aux != -1) //se encontrado candidato no array
                ret[aux].votos += element.votos //soma os votos
            else
                ret.push(element) //insere no array
        }   
    }

    ret.sort((a, b) => b.votos - a.votos) //ordena por qtd de votos
    return ret
}
