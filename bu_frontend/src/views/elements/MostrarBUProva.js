import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Label,

} from 'reactstrap';
//import DeleteIcon from '@mui/icons-material/Delete';
//import IconButton from '@mui/material/IconButton';
//import Tooltip from '@mui/material/Tooltip';
import { verify } from '../../api/merkletree.api'
import cadVerde from '../../assets/images/cad-verde.png';
import cadVermelho from '../../assets/images/cad-vermelho.png';
import ReactJson from 'react-json-view'

class MostrarBUProva extends Component {
  axios = require('axios')
  bu_api_url = require('../../config.json').bu_api_url
  // bu_api_url = "http://172.20.11.11:8080"



  constructor(props) {
    super(props)
    this.state = {bu: [],
                  prova: [],
                  votos: [],
                  root: [],
                  fullproof: [],
                  mostrarProva: false,
                }
    
    this.mostraProva = this.mostraProva.bind(this);

  }

  componentDidMount() {
    const { id } = this.props.match.params;
//    console.log("id=" + id)
    this.axios.get(`${this.bu_api_url}/bu/${id}`)
      .then(response => this.setState({ bu: response.data, votos: response.data.votos }))
    var retVerify = verify(id)
    retVerify.then( value => {
      this.setState({ prova: value })
      this.setState({ root: this.state.prova.root })
      this.setState({ fullproof: this.state.prova.fullproof })
    })
    
  }

  mostraProva() {
    this.setState({mostrarProva: !this.state.mostrarProva})
//      (this.state.mostrarProva)
  }
  
  render() {
    var bu = this.state.bu
    var prova = this.state.prova
//    console.log(this.state.prova)
//    console.log("fullProof")
//    console.log(prova.fullproof)
//    console.log("root")
//    console.log(prova.root)

console.log(this.state.bu.bu_inteiro)
  
    var mostrar = this.state.mostrarProva
    // var raizArr = (this.state.root===undefined)? [] : Array.from(this.state.root)
    // var fullproofArr = (this.state.fullproof===undefined)? [] : Array.from(this.state.fullproof)

    var votosArr = (this.state.votos===undefined)? [] : Array.from(this.state.votos)


   
  //    var votos = Array.from(bu.votos)
  //    console.log(bu.votos)
  const groupByCargo = votosArr.reduce((acc, curr) => {
    if (!acc[curr.cargo]) {
      acc[curr.cargo] = [];
    }
    acc[curr.cargo].push(curr);
    return acc;
  }, {});
    return (
      <Col>
      <Col style={{width:"40vw"}}>
      {prova.isTrue === true && (<Col md={4}>
      <Card style={{width:"60vw"}}>
        <CardHeader >Este BU foi devidamente verificado nos sistemas da Justiça Federal</CardHeader>
        <CardBody style={{overflowX:"scroll"}}>
            <CardBody>
            <Label>Prova</Label>
            <ReactJson collapsed displayDataTypes={false} src={this.state.prova} />
            </CardBody>
        </CardBody>
      </Card>
    </Col>)}
    {prova.isTrue === false && (<Col md={4}>
      <Card>
        <CardHeader>ATENÇÃO: Este BU não pode ser verificado ou foi ALTERADO</CardHeader>
        <CardBody style={{overflowX:"scroll"}}>
            <CardBody>
            <Label>Prova</Label>
            <ReactJson collapsed displayDataTypes={false} src={this.state.prova} />
            </CardBody>
        </CardBody>
      </Card>
    </Col>)}
    </Col>
      </Col>
    );
  }
}

export default MostrarBUProva;
