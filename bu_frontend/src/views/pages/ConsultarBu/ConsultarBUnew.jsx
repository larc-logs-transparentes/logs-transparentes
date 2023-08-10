import React, { Component } from 'react';
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PageLoaderContext from '../../../common/components/PageLoader/PageLoaderContext'

class ConsultarBU extends Component {
  axios = require('axios')
  bu_api_url = require('../../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                  lista: [],
                  formulario :undefined,
                  turno_opts: undefined,
                  uf_opts: undefined,
                  zona_opts: undefined,
                  secao_opts: undefined,
                  buSelecionado: undefined,
                  turno_selected: undefined,
                  uf_selected: undefined,
                  zona_selected: undefined,
                  secao_selected: undefined,
                }
    this.findBu = this.findBu.bind(this);

  }

  componentDidMount() {
    this.axios.get(`${this.bu_api_url}/bu/distinct_turno`)
      .then(response => {
        this.setState({ turno_opts: response.data });
      })
  }


  handleConsultar(e) {
    e.preventDefault()
    var url = "/pages/MostrarBu/MostrarBu/" + this.findBu()
    console.log(url)
    window.location.href =  url
  }


  handleChangeTurn(e) {
    this.axios.get(`${this.bu_api_url}/bu/distinct_uf?turno=${this.state.turno_selected}`) 
    .then(response => this.setState({ lista: response.data }))
  
    this.setState({uf_opts: list_states_unique}, () => console.log( this.state.uf_opts))
  }
  
  handleChangeUF(e) {

  }
  
  handleChangeZona(e) {

  }
  

  render() {
    const { lista } = this.state
    
    var len = lista.length
    var turno = new Map()
    var uf = new Map()
    var zona = new Map()
    var secao = new Map()

    for (var i=0; i<len; i++) {
      turno.set(lista[i].turno, lista[i].turno)
    }

    for (i in this.state.uf_opts) {
      uf.set(this.state.uf_opts[i], this.state.uf_opts[i])
    }
    
    for (i in this.state.zona_opts) {
      zona.set(this.state.zona_opts[i], this.state.zona_opts[i])
    }
    
    for (i in this.state.secao_opts) {
      secao.set(this.state.secao_opts[i], this.state.secao_opts[i])
    }
    
    let turnoArr = Array.from(turno.keys())
    let ufArr = Array.from(uf.keys())
    let zonaArr = Array.from(zona.keys())
    let secaoArr = Array.from(secao.keys()) 


      return (
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Consultar Boletins de Urna - Turno</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="turnoSelect">Turno</Label>
                <Input type="select" name="turno" id="turnoSelect" onChange={this.handleChangeTurn.bind(this)}>
                <option value=""></option>
                 {turnoArr.map((entry) => (
                    <option value={entry}>{entry}º</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Consultar Boletins de Urna - Estado</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="UFSelect">UF</Label>
                <Input type="select" name="uf" id="uf" onChange={this.handleChangeState.bind(this)}>
                <option value=""></option>
                {ufArr.map((entry) => (
                    <option value={entry}>{entry}</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
            <CardBody>
              <FormGroup>
                <Label for="zonaSelect">Zona</Label>
                <Input type="select" name="zona" id="zona" onChange={this.handleChangeZone.bind(this)}>
                <option value=""></option>
                {zonaArr.map((entry) => (
                    <option value={entry}>{entry}</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
            <CardBody>
              <FormGroup>
                <Label for="secaoSelect">Seção</Label>
                <Input type="select" name="secao" id="secao" onChange={this.handleChangeSecao.bind(this)}>
                <option value=""></option>
                {secaoArr.map((entry) => (
                    <option value={entry}>{entry}</option>
                ))}
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Consultar Boletins de Urna - Consulta</CardHeader>
            <CardBody>
              <PageLoaderContext.Consumer>
                {context => (
                  <Link to={"/pages/MostrarBu/MostrarBu/id" }> 
                  <Button onClick={this.handleConsultar.bind(this)}>Consultar</Button>
                  </Link>
                )}
              </PageLoaderContext.Consumer>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
    );
  }
}

export default ConsultarBU;
