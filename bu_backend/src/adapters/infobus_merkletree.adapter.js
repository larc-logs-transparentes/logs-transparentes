const axios = require('axios')
const merkletreeHostname = require('../config/config').merkletreeHostname
const merkletreePort = require('../config/config').merkletreePort

exports.sendLeaves = (leaves) => {
    return axios.post(`${merkletreeHostname}:${merkletreePort}/infobus/leaves`, {
      data: leaves
    })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
  
exports.getProof = (infoBU) => {
    return axios.post(`${merkletreeHostname}:${merkletreePort}/infobus/proof`, {
      leaves: infoBU
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
  
exports.getResultProof = (i_inicial, i_final) => {
    return axios.get(`${merkletreeHostname}:${merkletreePort}/infobus/resultProof?i_inicial=${i_inicial}&i_final=${i_final}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
  
exports.getRoot = () => {
    return axios.get(`${merkletreeHostname}:${merkletreePort}/infobus/root`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}