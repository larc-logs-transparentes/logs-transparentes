import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  FormGroup,
  Label,
  Input, 
  FormText
} from 'reactstrap';
import { getRoot, verifyResultProof, getSumOfVotes_infoBUs } from '../../../api/merkletree_InfoBUs.api'
import { getInfoBUsFromIdRange, getResultProofFromIdRange } from '../../../api/bu.api';
import cadVerde from '../../../assets/images/cad-verde.png';
import cadVermelho from '../../../assets/images/cad-vermelho.png';

class Mapa extends Component {
  axios = require('axios')
  bu_api_url = require('../../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                  infoBUs: [],
                  votos_cidade: [],
                  id_inicial:"",
                  id_final:"",
                  resultadoProvaParcial: false,
                  mostrarProvaParcial: false,
                  dadosProvaParcial: [],
                }

  }
  
  

componentDidMount() {
  return

}

async componentDidUpdate(prevProps, prevState) {
    console.log('---------this.state---------')
    console.log(this.state)
    if(prevState.id_final !== this.state.id_final) {
      const infoBUs = await getInfoBUsFromIdRange(this.state.id_inicial, this.state.id_final)
      this.setState({ infoBUs: infoBUs })
      this.setState({ votos_cidade: getSumOfVotes_infoBUs(infoBUs) })
      
      const root = await getRoot()
      const resultProof = await getResultProofFromIdRange(this.state.id_inicial, this.state.id_final)
      this.setState({ dadosProvaParcial : resultProof })
      this.setState({ resultadoProvaParcial : verifyResultProof(infoBUs, resultProof, root) })
  }
}

  defineFaixaSaoCarlos(){
    this.setState( {id_final:3, id_inicial:1});
  }
  defineFaixaCampinas(){
    this.setState( {id_final:6, id_inicial:4});
  }
  defineFaixaRibeiraoPreto(){
    this.setState( {id_final:9, id_inicial:7});
  }
  defineFaixaMarilia(){
    this.setState( {id_final:12, id_inicial:10});
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
    this.setState({mostrarProvaParcial: !this.state.mostrarProvaParcial})
  }

  redirecionaParaProvaCompleta(e) {
    e.preventDefault()
    const id_inicial = this.state.id_inicial
    const id_final = this.state.id_final
    var url = `/mapa/verificacaoCompleta/${id_inicial}/${id_final}`
    window.location.href =  url
  }

  render() {
    let cidadeArr = ['São Carlos','Campinas', 'Ribeirão Preto', 'Marília']


      return (
      <Row>
        <Col md={6}>
          <Card>
            <CardHeader>Selecionar Cidade</CardHeader>
            <CardBody>  
              <FormGroup>
                <div style={{display:'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Label for="turnoSelect">Cidade:</Label>
                  <Input type="select" name="turno" id="turnoSelect" onChange={this.handleChange.bind(this)}>
                    <option value=""></option>
                    {cidadeArr.map((entry) => (
                        <option value={entry}>{entry}</option>
                        
                    ))}
                  </Input>
                  {this.state.id_inicial && <button className="btn float-right" style={{position: 'relative', bottom: '2px'}} onClick={() => this.mostraProva()}><img src={(this.state.resultadoProvaParcial===true)? cadVerde : cadVermelho} alt="estado" /></button>}
                  {!this.state.id_inicial && <span  style={{width: '65.8px'}} />}
                </div>
                {!this.state.id_inicial && !this.state.id_final && <FormText color="muted">Selecione a cidade para visualizar os BU's</FormText>}
                {this.state.id_inicial && this.state.id_final && <FormText color="muted">Faixa de BU's da cidade: {this.state.id_inicial} a {this.state.id_final}</FormText>}
              </FormGroup>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Resultado da eleição:</CardHeader>
                  <h5 style={{marginLeft:'20px'}}>{this.state.votos_cidade.map(({nome, votos}) =>
                   (<p key={nome}>{nome}: {votos} votos</p>))}</h5>
            
            {this.state.id_inicial && <div style={{display: 'flex', justifyContent:'center'}}>
              <button onClick={this.redirecionaParaProvaCompleta.bind(this)} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem', width: '45%', marginBottom: '20px'}}>
                Verificação completa
              </button>

            </div>}
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <CardHeader>Verificação resumida</CardHeader>
            <CardBody>
              <FormGroup>
              {this.state.mostrarProvaParcial === true && this.state.resultadoProvaParcial && (<Col md={14}>
              <Card>
                <CardHeader >O resultado dessa cidade foi verificada nos sistemas da Justiça eleitoral</CardHeader>
                <CardBody>
                    <CardBody>
                    <Label>Prova</Label>
                    <CardText>Foram verificados {this.state.dadosProvaParcial.length} nós da árvore de infoBUs</CardText>                    
                    <CardText>{JSON.stringify(this.state.dadosProvaParcial )}</CardText>
                    </CardBody>
                </CardBody>
              </Card>
            </Col>)}
              {this.state.mostrarProvaParcial === true && !this.state.resultadoProvaParcial && (
              <Col md={14}>
              <Card>
                <CardHeader>ATENÇÃO: O resultado dessa cidade não pode ser verificado ou foi ALTERADO</CardHeader>
                <CardBody>
                    <CardBody>
                    <Label>Prova</Label>
                    <CardText>{JSON.stringify(this.state.dadosProvaParcial )}</CardText>
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