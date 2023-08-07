const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url

export function getDataProof(id){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/data-proof?tree_name=bu_tree&index=${id}`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getTrustedRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree_name=global_tree`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getTrustedRootLocal(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree_name=bu_tree`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getAllRoots(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/all-roots-global-tree`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getAllConsistencyProof(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/all-consistency-proof?tree_name=global_tree`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}

export function getLocalTreeList(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}
export function getTreeResponse(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/?tree_name=tree`)
        .then((res) => {
            resolve((res.data));
            //console.log(rootS)
        },
        (err) => {
            console.log(err)
            reject(err);
        })
        
    })
}