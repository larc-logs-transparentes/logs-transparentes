const axios = require('axios')
const merkletreeHostname = "http://localhost"
const merkletreePort = 3001

exports.addLeaf = (data) => {
  return axios.post(`${merkletreeHostname}:${merkletreePort}/tree/leaf`, {
      leaf: data
    })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

// return merkletree
exports.getTree = () => {
  return axios.get(`${merkletreeHostname}:${merkletreePort}/tree`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getTreeRoot = () => {
  return axios.get(`${merkletreeHostname}:${merkletreePort}/tree/root`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getLeafAndProofById = (id) => {
  return axios.get(`${merkletreeHostname}:${merkletreePort}/tree/leaf/${id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getLeafById = (id) => {
  return axios.get(`${merkletreeHostname}:${merkletreePort}/leaf/${id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getAllLeaves = () => {
  return axios.get(`${merkletreeHostname}:${merkletreePort}/tree/leaves`)
    .then(res => {
      //console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getProof = (firstTreeSize) => {
  return axios.get(`${merkletreeHostname}:${merkletreePort}/tree/proof?m=${firstTreeSize}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.log(err)
  }) 
}

exports.infoBUs_sendLeaves = (leaves) => {
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