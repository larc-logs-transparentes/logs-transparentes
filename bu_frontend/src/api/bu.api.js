const axios = require('axios')
const bu_api_url = "http://localhost:8080"

export const addBu = (data) => {
  return axios.post(`${bu_api_url}/bu`, data)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getBuById = (bu_id) => {
  return axios.get(`${bu_api_url}/bu/${bu_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getBu = async (turno, estado, zona, secao) => {
  return axios.get(`${bu_api_url}/bu/get_one/?turno=${turno}&uf=${estado}&zona=${zona}&secao=${secao}`)
    .then(res => {
      console.log("res.data")
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getLeafAndProof = (leaf_id) => {
  return axios.get(`${bu_api_url}/tree/leaf/${leaf_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
