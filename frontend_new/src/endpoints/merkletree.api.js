import axios from 'axios';
const bu_api_url = 'http://localhost:8080';


export function getDataProof(merkletree_leaf_index, tree_name) {
    return new Promise(function (resolve, reject) {
        axios.get(`${bu_api_url}/tree/data-proof?tree_name=${tree_name}&index=${merkletree_leaf_index}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}


export function getTrustedRoot(){
    return new Promise(function (resolve, reject){
        axios.get(`${bu_api_url}/tree/tree-root?tree_name=global_tree`)
        .then((res) => {
            resolve((res.data));
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