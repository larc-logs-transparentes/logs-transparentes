import { Buffer } from "buffer"
const SHA256 = require('crypto-js/sha256')
const crypto_js = require("crypto-js");
var hashFn = bufferifyFn(SHA256)
const _ = require('lodash');
const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url

/**
     * @desc - Verify a Inclusion Proof for a leaf
     * @param {Object} leaf - leaf data
     * @param {Object} root - Root of the tree
     * @param {Object[]} proof - Array of proof data
     * @returns {boolean} - true if the proof is valid, false otherwise.
*/
export function verifyInclusionProof(leaf, root, proof){    
    let hash = leaf;
    if (!Array.isArray(proof) || !leaf || !root)
        return false;
    if(!Buffer.isBuffer(root.leaf)) 
        root.leaf = Buffer.from(root.leaf);
    for (let i = 0; i < proof.length; i++) {
        const node = proof[i];
        let data = node.data;
        let isLeftNode = node.position === 'left';
        const buffers = [];
        buffers.push(hash);
        buffers[isLeftNode ? 'unshift' : 'push'](data);
        hash = parentOf(buffers[0], buffers[1]);
    }
    return Buffer.compare(hash.leaf, root.leaf) === 0;
}

/**
    * @desc - Acess the API and get the root of the tree
*/
export function getRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/infoBUs/tree/root`)
        .then((res) => {
            const root = res.data;
            root.leaf = Buffer.from(root.leaf, 'hex');
            resolve(root);
        },
        (err) => {
            console.log(err)
            reject(err);
        })       
    })
}

/**
    * @desc - Verify a Inclusion Proof for a leaf and sum of votes
    * @param {Object[]} listInfoBUS - array of infoBUs
    * @param {Object[]} resultInclusionProof - array with Proof with proof of each key node
    * @param {Object} root - Root of the tree
    * @returns {boolean} - true if the proof and sum is valid, false otherwise.
*/
export function verifyResultProof (listInfoBUS, resultInclusionProof, root) {
    if(!listInfoBUS || !resultInclusionProof || !root)
        return false

    if (verifyMultipleInclusionProofs(root, resultInclusionProof) === false)
        return false

    let sum_infoBUs = getSumOfVotes_infoBUs(listInfoBUS)
    let sum_proof = getSumOfVotes_proofData(resultInclusionProof)
    for(let i = 0; i < sum_infoBUs.length; i++){
        if(sum_infoBUs[i].votos !== sum_proof[i][1])
            return false
    }

    return true
}


/**
    * @desc - Verify hash of each infoBU and the inclusion proof
    * @param {Object[]} listInfoBUS - array of infoBUs
    * @param {Object[]} listInclusionProofs - array with Proof with proof node of each infoBU
    * @param {Object} root - Root of the tree
    * @returns {boolean} - id of the infoBU that is invalid, -1 if all is valid.
*/
export function verifyInfoBUs(listInfoBUS, listInclusionProofs, root){
    if(!listInfoBUS || !listInclusionProofs || !root)
        return -1

    for (let i = 0; i < listInfoBUS.length; i++) {
        const infoBUHash = getHash(listInfoBUS[i]);
        
        if(Buffer.compare(Buffer.from(infoBUHash, 'hex'), Buffer.from(listInclusionProofs[i].leaf.leaf)) !== 0)
            return listInfoBUS[i].id

        console.log(listInclusionProofs[i])
        if(!verifyInclusionProof(listInclusionProofs[i].leaf, root, listInclusionProofs[i].proof))
            return listInfoBUS[i].id
    }

    return -1
}

/**
    * @desc - get the sum of votes of each candidate
    * @param {Object[]} infoBUs - array with infoBUs
    * @returns {Object[]} - array with sum of votes of each candidate
*/
export function getSumOfVotes_infoBUs(infoBUs){
    const ret = []
    for (let i = 0; i < infoBUs.length; i++) {
        const candidatos = infoBUs[i].votos_validos;
        for (let j = 0; j < candidatos.length; j++) {
            const element = candidatos[j];
            let aux = ret.findIndex(candidato => candidato.codigo === element.codigo)
            
            if(aux !== -1) //se encontrado candidato no array
                ret[aux].votos += element.votos //soma os votos
            else
                ret.push(_.cloneDeep(element)) //insere no array
        }       
    }
    return ret
}

/**
    * @desc - buffer to hex string with prefix
    * @param {Buffer} value - Buffer to convert
    * @param {boolean} withPrefix - true if you want to add the prefix 0x
    * @returns {string} - hex string
*/
export function bufferToHex(value, withPrefix = true) {
    return `${withPrefix ? '0x' : ''}${(value || Buffer.alloc(0)).toString('hex')}`;
}

/**
    * @desc - get hash of infoBU
    * @param {Object} infoBU - infoBU to get hash
    * @returns {string} - hash of infoBU
*/
export function getHash(infoBU) {
    return SHA256(JSON.stringify({
        _id: infoBU._id,
        id: infoBU.id,
        secao: infoBU.secao,
        zona: infoBU.zona,
        UF: infoBU.UF,
        turno: infoBU.turno,
        cidade: infoBU.cidade,
        bu_inteiro: infoBU.bu_inteiro,
        regras_aplicadas: null,
        votos_validos: infoBU.votos_validos,
        indice_na_arvore_de_BUs: infoBU.indice_na_arvore_de_BUs,
    })).toString();
}

/* Funções privadas */

function verifyMultipleInclusionProofs(root, proofs){
    if(proofs.length === 0) 
        return false
        
    for (let i = 0; i < proofs.length; i++) {
        const proof = proofs[i];
        if (!verifyInclusionProof(proof.leaf, root, proof.proof))
            return false;
    }
    return true;
}

function getSumOfVotes_proofData(proofs){
    /* {"leaf": {"leaf": {}, "vote": [[null, 313]]},"coordinates": {},"proof": [{}]} */
    const ret = []
    for (let i = 0; i < proofs.length; i++) {
        const vote = proofs[i].leaf.vote;
        for (let j = 0; j < vote.length; j++) {
            const resultPerCandidate = vote[j];
            let aux = ret.findIndex(candidato => candidato[0] === resultPerCandidate[0])
            if (aux !== -1) //se encontrado candidato no array
                ret[aux][1] += resultPerCandidate[1] //soma os votos
            else
                ret.push(_.cloneDeep(resultPerCandidate)) //insere no array 
        }
    }
    return ret
}

function parentOf(leftNode, rightNode) {
    leftNode.leaf = Buffer.from(leftNode.leaf);
    rightNode.leaf = Buffer.from(rightNode.leaf);

    let parentVote = _.cloneDeep(leftNode.vote).concat(_.cloneDeep(rightNode.vote));
    parentVote = parentVote.filter((item, i) => {
        const index = parentVote.findIndex((x) => x[0] === item[0]);
        if (index === i)
            return true;
        else
            parentVote[index][1] += item[1];
        return false;
    });
    const parentHash = hashFn(Buffer.concat([hashFn(parentVote.toString()), leftNode.leaf, rightNode.leaf], 3));
    return {
        leaf: parentHash,
        vote: parentVote
    };
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
        return Buffer.from(f(crypto_js.enc.Hex.parse(value.toString('hex'))).toString(crypto_js.enc.Hex), 'hex');
    };
}