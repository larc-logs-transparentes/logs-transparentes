const axios = require('axios')
const tlmanager_config = require('../config.json').tlmanager_config
const tlmanagerHostname = tlmanager_config.hostname
const tlmanagerPort = tlmanager_config.port

/* admin routes */
exports.addLeaf = async (tree_name, data) => {
  return await axios.post(`${tlmanagerHostname}:${tlmanagerPort}/insert-leaf`, {
      tree_name: tree_name,
      data: JSON.stringify(data)
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
    })
}

exports.createTree = async (tree_name, commitment_size) => {
  console.log(`[tlmanager.adapter] createTree(${tree_name}, ${commitment_size})`)
  return await axios.post(`${tlmanagerHostname}:${tlmanagerPort}/tree-create`, {
      "tree_name": tree_name,
      "commitment_size": commitment_size
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
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
    console.error(`[ERROR][tlmanager.adapter]${JSON.stringify(err)}`)
  })
}