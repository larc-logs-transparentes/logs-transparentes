
import { Buffer } from "buffer"
const axios = require('axios')

const bu_api_url = require('../config.json').bu_api_url

function getBuById(bu_id) {
    return axios.get(`${bu_api_url}/bu/${bu_id}`)
      .then(res => {
      //  console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
}

function getRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/root`)
        .then((res) => {
            console.log(res.data)
            resolve(Buffer.from(res.data, 'hex'));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
   
}
function getProofInfo(leafid){
  return new Promise(function (resolve, reject){
      axios.get(`${bu_api_url}/tree/leaf/${leafid}`)
          .then((res) => {
         // console.log(res.data.proof[0].data)
          var proofS =  res.data.proof
          var proofHex = res.data.proofHex
          for(let i = 0; i < proofS.length; i++){
              // eslint-disable-next-line
              if(typeof proofS[i].data.data === 'Array'){
                  proofS[i] = Buffer.from(JSON.stringify(proofS[i]))
              }
              proofS[i].data = Buffer.from(JSON.stringify(proofS[i].data.data))
          }
          for(let i = 0; i < proofHex.length; i++){
              // eslint-disable-next-line
              if(typeof proofHex[i] === 'string'){
                  proofS[i].data = Buffer.from(proofHex[i].replace('0x', ''), 'hex')
              }
          }
          var proofLenght= proofS.length
          var Leaf = res.data.leaf
          var proofString = res.data.proof
          var answer = [proofLenght, Leaf, proofS, proofString]
          resolve(answer);
          },
          (err) => {
              console.log(err)
              reject(err);
          }
      );
  })
}
export default async function verifyinfo(buId){
    var BU = await getBuById(buId)
    console.log("bu_verify", BU)
    var leafid = BU.merkletree_leaf_index
    var root = await getRoot()
    var root = root.toString('hex')
    var fullproof
    fullproof = await getProofInfo(leafid)
    var leaf = fullproof[1]
    var proof = fullproof[2]
    var proofString = fullproof[3]
    
    for(var i = 0; i < proofString.length; i++){
       //  if(typeof proofString[i] === 'buffer'){
             proofString[i].data = proofString[i].data.toString('hex')
         // }
     }
    let fullproofString = JSON.stringify(proofString)
    
    return { leaf,root,fullproofString}
}