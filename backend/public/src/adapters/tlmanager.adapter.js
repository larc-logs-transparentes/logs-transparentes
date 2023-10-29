const axios = require('axios')
const tlmanager_config = require('../config.json').tlmanager_config
const tlmanagerHostname = tlmanager_config.hostname
const tlmanagerPort = tlmanager_config.port

/* Tree routes */
exports.getTree = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/tree?tree_name=${tree_name}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
  })
}

exports.getTreeRoot = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/tree/root?tree_name=${tree_name}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
    })
}

exports.getAllRoots = () => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/global-tree/all-roots`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
    })
}


/* Proofs routes */
exports.getConsistencyProof = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/all-consistency-proof?tree_name=${tree_name}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
  }) 
}

exports.getDataProof = (tree_name, leaf_index) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/data-proof?tree_name=${tree_name}&index=${leaf_index}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
  })
}

exports.getInclusionProof = (tree_name, leaf_index) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/inclusion-proof?tree_name=${tree_name}&index=${leaf_index}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
  })
}

exports.getGlobalTreeAllLeafData = () => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/global-tree/all-leaf-data`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
  })
}