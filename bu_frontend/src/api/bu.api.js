const axios = require('axios')
const bu_api_url = "http://localhost:8080"

exports.addBu = (data) => {
  return axios.post(`${bu_api_url}/bu`, data)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getBuById = (bu_id) => {
  return axios.get(`${bu_api_url}/bu/${bu_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getLeafAndProof = (leaf_id) => {
  return axios.get(`${bu_api_url}/tree/leaf/${leaf_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
