import React, { Component , useState, useEffect} from 'react';
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
  FormText
} from 'reactstrap';
import { getRoot, verifyMultipleProofs } from '../../../api/merkletree_InfoBUs.api'
import cadVerde from '../../../assets/images/cad-verde.png';
import cadVermelho from '../../../assets/images/cad-vermelho.png';

class Mapa extends Component {
  axios = require('axios')
  bu_api_url = require('../../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                  lista: [],
                  id_inicial:'' ,
                  id_final:'',
                  resultadoProva: false,
                  mostrarProva: false,
                  provaDados: [],
                }

  }
  
  

componentDidMount() {
  this.axios.get(`${this.bu_api_url}/bu?id_inicial=${this.state.id_inicial}&id_final=${this.state.id_final}`)
    .then(response => {
      this.setState({ lista: response.data })&&console.log(response.data)
    })
    console.log(this.state)
}

componentDidUpdate(prevProps, prevState) {
    console.log('---------this.state---------')
    console.log(this.state)
    if(prevState.id_final !== this.state.id_final) {
      this.axios.get(`${this.bu_api_url}/bu?id_inicial=${this.state.id_inicial}&id_final=${this.state.id_final}`)
          .then(response => {this.setState({ lista: response.data });})

      this.axios.get(`${this.bu_api_url}/infoBUs/tree/resultProof?i_inicial=${this.state.id_inicial}&i_final=${this.state.id_final}`)
      .then(async response => {
          console.log(response.data)
          const root = await getRoot()
          this.setState({ provaDados : response.data })
          this.setState({ resultadoProva : verifyMultipleProofs(root, response.data) })
          console.log(`resultado da prova de inclusão: ${verifyMultipleProofs(root, response.data)}`)
      })
      .catch(error => {
          console.log(error)
      })
  }
}



  defineFaixaSaoCarlos(){
    this.setState( {id_final:3, id_inicial:1});
  }
  defineFaixaCampinas(){
    this.setState( {id_final:6, id_inicial:4});
  }
  defineFaixaRibeiraoPreto(){
    this.setState( {id_final:9, id_inicial:6});
  }
  defineFaixaMarilia(){
    this.setState( {id_final:12, id_inicial:9});
  }

  handleChange(e) {
    if (e.target.value === 'São Carlos'){
      this.defineFaixaSaoCarlos();}
    if (e.target.value === 'Campinas'){
      this.defineFaixaCampinas();}
    if (e.target.value === 'Ribeirão Preto'){
      this.defineFaixaRibeiraoPreto();}
    if (e.target.value === 'Marília'){
      this.defineFaixaMarilia();}
    return
  }

  mostraProva() {
    this.setState({mostrarProva: !this.state.mostrarProva})
  }

  render() {
    const { lista } = this.state
    let cidadeArr = ['São Carlos','Campinas', 'Ribeirão Preto', 'Marília']


      return (
      <Row>
        <Col md={6}>
          <Card>
            <CardHeader>Selecionar Cidade</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="turnoSelect">Cidade</Label>
                <Input type="select" name="turno" id="turnoSelect" onChange={this.handleChange.bind(this)}>
                  <option value=""></option>
                
                  {cidadeArr.map((entry) => (
                      <option value={entry}>{entry}</option>
                      
                  ))}
                </Input>
            </FormGroup>
            </CardBody>
          </Card>
                  
          <Card>
            <CardHeader>Resultado da eleição:<button className="btn float-right" onClick={() => this.mostraProva()}><img src={(this.state.resultadoProva===true)? cadVerde : cadVermelho} alt="estado" /></button></CardHeader>
                  <h5 style={{marginLeft:'20px'}}>{lista.map(({nome, votos}) =>
                   (<p key={nome}>{nome}: {votos} votos</p>))}</h5>
            <CardBody>

            </CardBody>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <CardHeader>Prova de Resultado</CardHeader>
            <CardBody>
              <FormGroup>
              {this.state.mostrarProva === true && this.state.resultadoProva && (<Col md={14}>
              <Card>
                <CardHeader >Este BU foi devidamente verificado nos sistemas da Justiça Federal</CardHeader>
                <CardBody>
                    <CardBody>
                    <Label>Prova</Label>
                    <CardText>{JSON.stringify(this.state.provaDados)}</CardText>
                    </CardBody>
                </CardBody>
              </Card>
            </Col>)}
              {this.state.mostrarProva === true && !this.state.resultadoProva && (
              <Col md={14}>
              <Card>
                <CardHeader>ATENÇÃO: Este BU não pode ser verificado ou foi ALTERADO</CardHeader>
                <CardBody>
                    <CardBody>
                    <Label>Prova</Label>
                    <CardText>{JSON.stringify(this.state.provaDados)}</CardText>
                    </CardBody>
                </CardBody>
              </Card>
            </Col>)}
                
            </FormGroup>
            </CardBody>
          </Card>
                  
        </Col>
      </Row>
      
    );
  }
}

export default Mapa;