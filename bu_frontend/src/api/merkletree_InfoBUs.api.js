import { Buffer } from "buffer"
const SHA256 = require('crypto-js/sha256')
const crypto_js_1 = require("crypto-js");
var hashFn = bufferifyFn(SHA256)
const _ = require('lodash');
const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url

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

export function verifyInfoBUs (root, proofs, infoBUs) {
    let proofsVerify_result = verifyMultipleProofs(root, proofs)
    if (proofsVerify_result === false)
        return false

    let sum_infoBUs = getSumOfVotes_infoBUs(infoBUs)
    let sum_proof = getSumOfVotes_proofData(proofs)
    for(let i = 0; i < sum_infoBUs.length; i++)
        if(sum_infoBUs[i].votos !== sum_proof[i])
            return false

    return true
}

export function getSumOfVotes_infoBUs(infoBUs){
    const ret = []
    for (let i = 0; i < infoBUs.length; i++) {
        const candidatos = infoBUs[i].votos_validos;
        for (let j = 0; j < candidatos.length; j++) {
            const element = candidatos[j];
            let aux = ret.findIndex(candidato => candidato.nome == element.nome)
            
            if(aux != -1) //se encontrado candidato no array
                ret[aux].votos += element.votos //soma os votos
            else
                ret.push(_.cloneDeep(element)) //insere no array
        }       
    }
    return ret
}

export function bufferToHex(value, withPrefix = true) {
    return `${withPrefix ? '0x' : ''}${(value || Buffer.alloc(0)).toString('hex')}`;
}

export function getHash(infoBU) {
    return SHA256(JSON.stringify({
        _id: infoBU.id,
        id: infoBU.id,
        secao: infoBU.secao,
        zona: infoBU.zona,
        UF: infoBU.UF,
        turno: infoBU.turno,
        regras_aplicadas: null,
        votos_validos: infoBU.votos_validos,
    })).toString();
}

/* Funções privadas */

function verifyMultipleProofs(root, proofs){
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
    const ret = [0, 0]
    for (let i = 0; i < proofs.length; i++) {
        const candidatos = proofs[i].leaf.vote;
        ret[0] += candidatos[0][1]
        ret[1] += candidatos[1][1]
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
        return Buffer.from(f(crypto_js_1.enc.Hex.parse(value.toString('hex'))).toString(crypto_js_1.enc.Hex), 'hex');
    };
}