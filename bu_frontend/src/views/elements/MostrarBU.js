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
  bu_api_url = "http://localhost:8080"

  constructor(props) {
    super(props)
    this.state = {bu: [],
                  prova: [],
                  votos: [],
                  mostrarProva: false}
    
    this.mostraProva = this.mostraProva.bind(this);

  }

  componentDidMount() {
    const { id } = this.props.match.params;
//    console.log("id=" + id)
    this.axios.get(`${this.bu_api_url}/bu/${id}`)
      .then(response => this.setState({ bu: response.data, votos: response.data.votos }))

    var retVerify = verify(id)
    retVerify.then( value => this.setState({ prova: value }))
  }

  mostraProva() {
    this.setState({mostrarProva: !this.state.mostrarProva})
    console.log(this.state.mostrarProva)
  }
  
  render() {
    var bu = this.state.bu
    var prova = this.state.prova
    console.log(prova.isTrue)
    console.log(prova.fullproof)
    console.log(prova.root)
    console.log(prova.BU)
  
    var mostrar = false
  
    const mostraProva = () => {mostrar = !mostrar
      console.log(mostrar)
    }
  //    var votos = Array.from(bu.votos)
  //    console.log(bu.votos)
  
    return (
      <Row>
      <Col md={8}>
        <Card>
          <CardHeader>Consultar Boletins de Urna - Turno<button class="btn float-right" onClick={() => mostraProva()}><img src={(prova.isTrue===true)? cadVerde : cadVermelho} alt="estado" /></button></CardHeader>
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
              <CardText>
              </CardText>
              </CardBody>
          </CardBody>
        </Card>
      </Col>
  
      </Row>
    );
  }
}

export default MostrarBU;
