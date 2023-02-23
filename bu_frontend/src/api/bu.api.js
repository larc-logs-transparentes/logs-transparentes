const axios = require('axios')
const bu_api_url = require('../config.json').bu_api_url

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
export function getRootAll() {
  axios.get(`${bu_api_url}/root/get_all`)
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
export function findByIdRange(id_inicial, id_final) {
  axios.get(`${bu_api_url}/bu?id_inicial=${id_inicial}&id_final=${id_final}`)
    .then(response => {

      console.log(response.data)
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

export const Sum = () => {
    return axios.get(`${bu_api_url}/home`) //partial
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
} 

export const getRoot = () => {
  return axios.get(`${bu_api_url}/tree/root`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getInfoBUsFromIdRange = (initial_id, final_id) => {
  return axios.get(`${bu_api_url}/infoBUs?id=${initial_id}&id_final=${final_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getLeavesAndProofFromIdRange = (initial_id, final_id) => {
  return axios.get(`${bu_api_url}/infoBUs/tree/leaf?id=${initial_id}&id_final=${final_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getResultProofFromIdRange = (initial_id, final_id) => {
  return axios.get(`${bu_api_url}/infoBUs/tree/resultProof?i_inicial=${initial_id}&i_final=${final_id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
    })
}