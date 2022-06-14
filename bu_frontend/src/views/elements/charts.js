import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { callbackify } from "util";

class Atualizacao extends Component {

  axios = require('axios')
  bu_api_url = require('../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                   lista: [],            
                   candidatos :
                    {votos: undefined,
                    _id: undefined
                  }
                }
  }
  
  componentDidMount(){
    this.axios.get(`${this.bu_api_url}/home`) //partial
      .then(response => this.setState({ lista: response.data }))
  }
 
  UpdateTable(){
    const { candidatos } = this.state  
    const { lista } = this.state
    var data;
    var len = lista.length
    var _id = new Map()
    var votos = new Map()

    for (var i=0; i<len; i++) {
      _id.set(lista[i]._id, lista[i]._id)
      votos.set(lista[i].votos, lista[i].votos)
    }

    let _idArr = Array.from(_id.keys())
    let votosArr = Array.from(votos.keys())

    return data = {
        labels: _idArr,
        datasets: [
          {
            data: votosArr,
            backgroundColor: ["red", "#36A2EB"],
            hoverBackgroundColor: ["#4c9e09", "#4c9e09"],
            borderWidth: 2
          }
        ]
      }
    }


render(){
 
  return <Doughnut data={this.UpdateTable()} />;
 
} 
}
export default Atualizacao;