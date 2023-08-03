const axios = require('axios')
const tlmanagerHostname = require('../config/config').tlmanagerHostname
const tlmanagerPort = require('../config/config').tlmanagerPort

/* admin routes */
exports.addLeaf = (tree_name, data) => {
  return axios.post(`${tlmanagerHostname}:${tlmanagerPort}/insert-leaf`, {
      "tree_name": tree_name,
      "data": data
    })
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
      "tree_name": tree_name,
      "commitment_size": commitment_size
    })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.commit = (tree_name) => {
  return axios.post(`${tlmanagerHostname}:${tlmanagerPort}/tree/commit`, {
    "tree_name": tree_name
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

/* Tree routes */
exports.getTree = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/tree?tree_name=${tree_name}`)
  .then(res => {
    console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getTreeRoot = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/tree/root?tree_name=${tree_name}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
exports.getAllRoots = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/global-tree/all-roots`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}


/* Proofs routes */
exports.getConsistencyProof = (tree_name) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/all-consistency-proof?tree_name=${tree_name}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
  }) 
}

exports.getDataProof = (tree_name, leaf_index) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/data-proof?tree_name=${tree_name}&index=${leaf_index}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

exports.getInclusionProof = (tree_name, leaf_index) => {
  return axios.get(`${tlmanagerHostname}:${tlmanagerPort}/inclusion-proof?tree_name=${tree_name}&index=${leaf_index}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}