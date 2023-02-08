import { Buffer } from "buffer"
const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url
//const bu_api_url = "http://172.20.11.11:8080"
var crypto_js_1 = require("crypto-js");
const SHA256 = require('crypto-js/sha256')
var hashFn = bufferifyFn(SHA256)


function getBuByIdString(bu_id) {
    return axios.get(`${bu_api_url}/bu/${bu_id}`)
      .then(res => {
        console.log(res.data)
        var buString = res.data.turno + res.data.secao + res.data.zona + res.data.UF
        return buString
      })
      .catch(err => {
        console.log(err)
      })
}

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

function getLeafDataFromBu(BU) {
    return {
        turno: BU.turno,
        secao: BU.secao,
        zona: BU.zona,
        UF: BU.UF
    }
}



async function main(){
    var leafid = 1
    var root = await getRoot()
    var n
    n = await getProofInfo(leafid)
    var leaf = n[1]
    var proof = n[2]

    var isTrue =  verifyProof(leaf, root, proof)

    var BU = await getBuByIdString(1)
    const BuLeafData = getLeafDataFromBu(BU)
    //var isBUTrue = verifyLeaf(leaf, BuLeafData, root )
    console.log("Teste do BU")
    console.log(BU)
    console.log(leaf)
    //console.log(isBUTrue)

    console.log("teste com dados certos")
    console.log(isTrue)
    console.log("raiz")
    console.log(root)
    console.log("prova")
    console.log(proof)

    var proofWrong = proof
    proofWrong[1].data = proofWrong[0].data 
    isTrue = await verifyProof(leaf, root, proofWrong)
    console.log("teste com prova errada")
    console.log(isTrue)
    console.log("raiz")
    console.log(root)
    console.log("prova")
    console.log(proofWrong)

    isTrue = await verifyProof(leaf, leaf, proof)
    console.log("teste com root errada")
    console.log(isTrue)
    console.log("raiz")
    console.log(leaf)
    console.log("prova")
    console.log(proof)

    isTrue = await verifyProof(root, root, proof)
    console.log("teste com folha errada")
    console.log(isTrue)
    console.log("raiz")
    console.log(root)
    console.log("prova")
    console.log(proof)
}


function getProofInfo(leafid){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/leaf/${leafid}`)
            .then((res) => {
           // console.log(res.data.proof[0].data)
            var proofS =  res.data.proof
            var proofHex = res.data.proofHex
            for(var i = 0; i < proofS.length; i++){
                if(typeof proofS[i].data.data === 'Array'){
                    proofS[i] = Buffer.from(JSON.stringify(proofS[i]))
                }
                proofS[i].data = Buffer.from(JSON.stringify(proofS[i].data.data))
            }
            for(var i = 0; i < proofHex.length; i++){
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


function verifyLeaf(leafS, BU){    
    var hash = bufferify(leafS);  
    var buString =  BU.turno + BU.secao + BU.zona + BU.UF + JSON.stringify(BU.votos)
    buString = JSON.stringify(buString)
   // console.log("BuString:")
   // console.log(buString)

   //tem q usar o stringify
   // var BUHash = SHA256(JSON.stringify(buString))
    var BUHash = SHA256(buString)
    BUHash = bufferify(BUHash)
   // console.log("leaf")
   // console.log("leaf", leafS)
   // console.log("BU hash", BUHash)
   // console.log(hash)
   // console.log(Buffer.compare(BUHash, hash) === 0)
    if (Buffer.compare(BUHash, hash) === 0){
        return [ true, BUHash ]
    }
    else{
        return [false , BUHash]
    }
}


function verifyProof(leafS, rootS, proofS){    

        var hash = bufferify(leafS);
        rootS = bufferify(rootS);
        if (!Array.isArray(proofS) ||
            !leafS ||
            !rootS) {
            return false;
        }
        for (var i = 0; i < proofS.length; i++) {
            var node = proofS[i];
            var data = null;
            var isLeftNode = null;
            // case for when proof is hex values only
            if (typeof node === 'string') {
                data = bufferify(node);
                isLeftNode = true;
            }
            else if (Array.isArray(node)) {
                isLeftNode = (node[0] === 0);
                data = bufferify(node[1]);
            }
            else if (Buffer.isBuffer(node)) {
                data = node;
                isLeftNode = true;
            }
            else if (node instanceof Object) {
                data = bufferify(node.data);
                isLeftNode = (node.position === 'left');
            }
            else {
                throw new Error('Expected node to be of type string or object');
            }
            var buffers = [];
            

            buffers.push(hash);
            buffers[isLeftNode ? 'unshift' : 'push'](data);
            hash = hashFn(Buffer.concat(buffers));
        
            
        }
        //console.log(Buffer.compare(hash, rootS) === 0)
        if (Buffer.compare(hash, rootS) === 0){
            return true
        }
        else{
            return false
        }
        
}


function bufferifyFn(f) {
 
    return function (value) {
        var v = f(value);
        if (Buffer.isBuffer(v)) {
            return v;
        }
        if (typeof v === 'string' && /^(0x)?[0-9A-Fa-f]*$/.test(v)) {
            return Buffer.from(v.replace('0x', ''), 'hex');
        }
        if (typeof v === 'string') {
            return Buffer.from(v);
        }
        if (ArrayBuffer.isView(v)) {
            return Buffer.from(v.buffer, v.byteOffset, v.byteLength);
        }
        // crypto-js support
        return Buffer.from(f(crypto_js_1.enc.Hex.parse(value.toString('hex'))).toString(crypto_js_1.enc.Hex), 'hex');
    };
}


function bufferify(value) {
    if (!Buffer.isBuffer(value)) {
        // crypto-js support
        if (typeof value === 'object' && value.words) {
            return Buffer.from(value.toString(crypto_js_1.enc.Hex), 'hex');
        }
        else if (typeof value === 'string' && /^(0x)?[0-9A-Fa-f]*$/.test(value)) {
            return Buffer.from(value.replace(/^0x/, ''), 'hex');
        }
        else if (typeof value === 'string') {
            return Buffer.from(value);
        }
        else if (typeof value === 'number') {
            var s = value.toString();
            if (s.length % 2) {
                s = "0".concat(s);
            }
            return Buffer.from(s, 'hex');
        }
        else if (ArrayBuffer.isView(value)) {
            return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
        }
    }
    
    return value;
}

export async function verify(buId){
   
    var BU = await getBuById(buId)
   // console.log(BU)
    var leafid = BU.merkletree_leaf_index
    var root = await getRoot()
    var rootString = root.toString('hex')
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
    fullproof[3] = proofString

    var verifyLeafOut = verifyLeaf(leaf, BU )
    var isBUTrue = verifyLeafOut[0]
    var newBUHash = verifyLeafOut[1].toString('hex')

    var isProofTrue =  verifyProof(leaf, root, proof)
   
    
    console.log("Teste do BU")
    //console.log(BU)
    //console.log(leaf)
    console.log(isBUTrue)

   

    console.log("teste com dados certos")
    console.log(isProofTrue)
    console.log("raiz")
    console.log(root.toString('hex'))
    console.log("prova")
    console.log(fullproof[3])


    var isTrue = isProofTrue && isBUTrue
    return { isTrue, fullproof, rootString, BU, newBUHash }
}

async function exampleVerify(buId){
    var verifyOutput = await verify(buId)
    console.log("------ExampleVerify-----")
    console.log(verifyOutput)
    console.log("-----------")
}
//module.exports = { verify }
//exampleVerify(1)
