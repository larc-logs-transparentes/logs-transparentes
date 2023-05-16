const axios = require('axios')
const tlmanagerHostname = require('../config/config').tlmanagerHostname
const tlmanagerPort = require('../config/config').tlmanagerPort

exports.addLeaf = (tree_name, data) => {
  return axios.post(`${tlmanagerHostname}:${tlmanagerPort}/insert-leaf`, {
      "tree-name": tree_name,
      data: data
    })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getTree = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/tree?tree-name=${tree_name}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getTreeRoot = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/tree/root?tree-name=${tree_name}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getLeafAndProofByIndex = (index) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/inclusion-proof?index=${index}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.createTree = (tree_name, commitment_size) => {
  return axios.post(`${tlmanagerHostname}:${tlmanagerPort}/tree-create`, {
      "tree-name": tree_name,
      "commitment-size": commitment_size
    })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getConsistencyProof = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/all-consistency-proof?tree-name=${tree_name}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
  }) 
}