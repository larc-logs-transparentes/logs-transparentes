const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url

export function getDataProof(id){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/data-proof?tree_name=bu_tree&index=${id}`)
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
export function getTrustedRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/global-tree/root`)
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
export function getTrustedRootLocal(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree_name=bu_tree`)
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
export function getAllRoots(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/global_tree/all-roots`)
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
export function getAllConsistencyProof(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/all-consistency-proof?tree_name=global_tree`)
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
export function getAllLeafData(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/global_tree/all-leaf-data`)
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

export function getLocalTreeList(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}`)
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
export function getTreeResponse(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/?tree_name=tree`)
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