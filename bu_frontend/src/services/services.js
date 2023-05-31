
import { Buffer } from "buffer"
const axios = require('axios')

const bu_api_url = require('../config.json').bu_api_url


export function getBuById(bu_id) {
    return axios.get(`${bu_api_url}/bu/${bu_id}`)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
}
export  function getDataProof(id){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/data-proof?tree-name=bu_tree&index=${id}`)
        .then((res) => {
            console.log(res.data)
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export  function getTrustedRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree-name=global_tree`)
        .then((res) => {
            console.log(res.data)
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree-name=global_tree`)
        .then((res) => {
            console.log(res.data)
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
   
}

export default async function verify_single_data_info(id){
    // let root=getRoot()
    // let proof=await getDataProof(id)
    // let proofString=JSON.stringify(proof)
    // let bu= await getBuById(id)
    // console.log(bu)
    // let bu_inteiro=bu['bu_inteiro']
    // let global_root=JSON.stringify(proof.global_root)
    // let info={proofString,global_root,bu_inteiro}
    return 'info' //retornando 'info' para fim de teste
}
