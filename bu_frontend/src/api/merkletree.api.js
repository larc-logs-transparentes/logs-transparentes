const axios = require('axios')
const bu_api_url = "http://localhost:8080"
var crypto_js_1 = require("crypto-js");
const SHA256 = require('crypto-js/sha256')

var hashFn = bufferifyFn(SHA256)
var rootS
var proofS 
var proofLength
var hashFn = bufferifyFn(SHA256)
axios.get(`${bu_api_url}/tree/root`)
      .then(res => {
        //console.log(res.data)
        rootS = Buffer.from(res.data, 'hex')
        //console.log(rootS)
      })
      .catch(err => {
        console.log(err)
      })


var leafid = 2
var leafS

axios.get(`${bu_api_url}/tree/leaf/${leafid}`)
    .then(res => {
    //console.log(res.data)
    proofS =  res.data.proof
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
    //console.log(Buffer.from(proofS[0].replace('0x', ''), 'hex'))
    //console.log(proofS)
    //console.log(proofS.length)
    proofLenght= proofS.length
    leafS = res.data.leaf
    })
    .catch(err => {
        console.log(err)
    })

function verify(){    
    axios.get(`${bu_api_url}/tree/leaf/${leafid}`)
        .then(res => {
        //console.log(res.data)
        proofS =  res.data.proof
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
        //console.log(Buffer.from(proofS[0].replace('0x', ''), 'hex'))
        proofLenght= proofS.length
        leafS = res.data.leaf

        
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
        console.log(Buffer.compare(hash, rootS) === 0)
        if (Buffer.compare(hash, rootS) === 0){
            return true
        }
        else{
            return false
        }
        
        })
        .catch(err => {
        console.log(err)
        })
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

a = verify()
console.log(toString(a))