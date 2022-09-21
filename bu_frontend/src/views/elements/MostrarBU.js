import React, { Component } from 'react';
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input, 
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalDialog
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Loader } from '../../vibe/';
//import DeleteIcon from '@mui/icons-material/Delete';
//import IconButton from '@mui/material/IconButton';
//import Tooltip from '@mui/material/Tooltip';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';
import laptopImage from '../../assets/images/laptop.jpeg';
import { getBuById } from '../../api/bu.api'
import { verify, facadeVerify } from '../../api/merkletree.api'
import cadVerde from '../../assets/images/cad-verde.png';
import cadVermelho from '../../assets/images/cad-vermelho.png';

class MostrarBU extends Component {
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
                  mostrarProva: false}
    
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
  

    console.log(JSON.stringify(this.state.prova))
    var mostrar = this.state.mostrarProva
    var raizArr = (this.state.root===undefined)? [] : Array.from(this.state.root)
    var fullproofArr = (this.state.fullproof===undefined)? [] : Array.from(this.state.fullproof)

    var votosArr = (this.state.votos===undefined)? [] : Array.from(this.state.votos)

    //console.log(votosArr)

   
  //    var votos = Array.from(bu.votos)
  //    console.log(bu.votos)
  
    return (
      <Row>
      <Col md={5}>
        <Card>
          <CardHeader>Consultar Boletins de Urna - Turno<button className="btn float-right" onClick={() => this.mostraProva()}><img src={(prova.isTrue===true)? cadVerde : cadVermelho} alt="estado" /></button></CardHeader>
          <CardBody>
              <Label>Detalhes</Label>
              <CardBody>
              <Label>Turno</Label>
              <CardText>{bu.turno}º</CardText>
              </CardBody>
              <CardBody>
              <Label>UF</Label>
              <CardText>{bu.UF}</CardText>
              </CardBody>
              <CardBody>
              <Label>Seção</Label>
              <CardText>{bu.secao}</CardText>
              </CardBody>
              <CardBody>
              <Label>Zona</Label>
              <CardText>{bu.zona}</CardText>
              </CardBody>
              <CardBody>
              <Label>Votos</Label>
              <CardText><ul>
                {votosArr.map(item => {
                  return <li>{item.nome + "; " + item.votos  + "; " + item.partido}</li>
                })}</ul>
              </CardText>
              </CardBody>
          </CardBody>
        </Card>
      </Col>
      {mostrar === true && prova.isTrue === true && (<Col md={4}>
      <Card>
        <CardHeader >Este BU foi devidamente verificado nos sistemas da Justiça Federal</CardHeader>
        <CardBody>
            <CardBody>
            <Label>Prova</Label>
            <CardText>{JSON.stringify(this.state.prova)}</CardText>
            </CardBody>
        </CardBody>
      </Card>
    </Col>)}
    {mostrar === true && prova.isTrue === false && (<Col md={4}>
      <Card>
        <CardHeader>ATENÇÃO: Este BU não pode ser verificado ou foi ALTERADO</CardHeader>
        <CardBody>
            <CardBody>
            <Label>Prova</Label>
            <CardText>{JSON.stringify(this.state.prova)}</CardText>
            </CardBody>
        </CardBody>
      </Card>
    </Col>)}
      </Row>
    );
  }
}

export default MostrarBU;
