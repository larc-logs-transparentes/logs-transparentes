const axios = require('axios')
const merkletree_api = require("../../../../api/merkletree.api")
const bu_api_url = require('../../../../config.json').bu_api_url

export async function RetotalizacaoDeBus(){
    console.log("Download de BUs iniciado")
    const BUs = await baixarBUs()
    console.log("Download de " + BUs.length + " BUs terminado")
    console.log(await verificarBUs(BUs))
    let numerodebusadicionados =  BUs.length;
    if (BUs===0){
        numerodebusadicionados=0
    }
    const verificarbus = await verificarBUs(BUs) // variavel para verificar os bus (true ou false)
    const verificarbusquantidade = verificarbus.verificacao_qtd
    console.log(verificarbusquantidade)
    const verificarbusinclusao = verificarbus.verificacao_inclusao
    const votosretotalizacao = retotalizar(BUs)
    const root = await PegarRoot(BUs)
    return [numerodebusadicionados,verificarbusquantidade,votosretotalizacao,verificarbusinclusao,root]
}

async function baixarBUs(){
    console.log(`${bu_api_url}/bu/get_all`)
    return await axios.get(`${bu_api_url}/bu/get_all`)
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
    return await axios.get(`${bu_api_url}/tree/leaves/qtd`)
    .then(res => {
        return res.data === BUs.length
    })
    .catch((err) => {
        console.log(err)
    })
}
async function PegarRoot(BUs){
    return await axios.get(`${bu_api_url}/tree/root`)
    .then(res => {
        return res.data
    })
    .catch((err) => {
        console.log(err)
    })
}

async function verificarInclusao(BUs){
    for (let i = 0; i < BUs.length; i++) { //percorre BUs
        const res = await merkletree_api.verify(BUs[i].id)
        if(!res.isTrue){
            return {
                isTrue: false,
                res: res
            }
        }
    }
    return {
        isTrue: true
    }
}

function retotalizar(BUs){
    const ret = []
    for (let i = 0; i < BUs.length; i++) {
        const votos= BUs[i].votos;
        for (let j = 0; j < votos.length; j++) {
                let candidatoIndexInArray = ret.findIndex(voto => voto.codigo === votos[j].codigo)

                if (candidatoIndexInArray !== -1) ret[candidatoIndexInArray].votos += votos[j].votos
                else {
                    let votoVotavel = {
                        cargo: votos[j].cargo,
                        partido: votos[j].partido,
                        codigo: votos[j].codigo,
                        votos: votos[j].votos,}
                     ret.push(votoVotavel)
            }
        }
    }
    console.log("votosvotaveis", ret)
    ret.sort((a, b) => {
        // separa os cargos
        if (a.cargo < b.cargo) return -1
        if (a.cargo > b.cargo) return 1
        return b.votos - a.votos
    }) //ordena por qtd de votos
    return ret
}