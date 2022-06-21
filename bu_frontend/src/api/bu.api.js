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

export function getBuAll() {
  axios.get(`${bu_api_url}/bu/get_all`)
    .then(response => {
//      console.log(response.data)
     return response.data
//      console.log(ret)
    })
    .catch(err => {
      console.log(err)
      return []
    })
}

export const getBuById = (bu_id) => {
  return axios.get(`${bu_api_url}/bu/${bu_id}`)
    .then(res => {
//      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getBu = async (turno, estado, zona, secao) => {
  console.log("getBu")
  console.log("turno=" + turno)
  console.log("uf=" + estado)
  console.log("zona=" + zona)
  console.log("secao=" + secao)
  
  return axios.get(`${bu_api_url}/bu/get_one/?turno=${turno}&uf=${estado}&zona=${zona}&secao=${secao}`)
    .then(res => {

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
export const getRoot = (root_id) => {
  return axios.get(`${bu_api_url}/tree/root/${root_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
