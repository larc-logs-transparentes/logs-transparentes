import { Buffer } from "buffer"
const SHA256 = require('crypto-js/sha256')
const crypto_js_1 = require("crypto-js");
var hashFn = bufferifyFn(SHA256)
const _ = require('lodash');
const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url

export function verifyProof(leaf, root, proof){    
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

export function verifyMultipleProofs(root, proofs){
    if(proofs.length === 0) 
        return false
        
    for (let i = 0; i < proofs.length; i++) {
        const proof = proofs[i];
        if (!verifyProof(proof.leaf, root, proof.proof))
            return false;
    }
    return true;
}

export function votosTotal(infoBUs){
    const ret = []
    for (let i = 0; i < infoBUs.length; i++) {
        const candidatos = infoBUs[i].votos_validos;
        for (let j = 0; j < candidatos.length; j++) {
            const element = candidatos[j];
            let aux = ret.findIndex(candidato => candidato.nome == element.nome)
            
            if(aux != -1) //se encontrado candidato no array
                ret[aux].votos += element.votos //soma os votos
            else
                ret.push(element) //insere no array
        }       
    }
    return ret
}

export function bufferToHex(value, withPrefix = true) {
    return `${withPrefix ? '0x' : ''}${(value || Buffer.alloc(0)).toString('hex')}`;
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