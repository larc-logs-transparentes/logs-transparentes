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

class Mapa extends Component {
  axios = require('axios')
  bu_api_url = require('../../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                  lista: [],
                  id_inicial:'' ,
                  id_final:''
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
            <CardHeader>Resultado da eleição:</CardHeader>
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
                <h2>Em construção</h2>
                
            </FormGroup>
            </CardBody>
          </Card>
                  
        </Col>
      </Row>
      
    );
  }
}

export default Mapa;