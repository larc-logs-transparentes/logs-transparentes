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
                  formulario :
                    {
                      turno: undefined,
                      uf: undefined,
                      zona: undefined,
                      secao: undefined,
                    }, 
                  turno_opts: undefined,
                  uf_opts: undefined,
                  zona_opts: undefined,
                  secao_opts: undefined,
                  buSelecionado: undefined,
                }

    // EXEMPLO DE COMO USAR A FUNÇÃO QUE CHAMA A API
    // turno, uf, zona, secao
    /*getBu("1", "SP", 123, "004").then((bu) => {
      console.log(bu)
    })*/
    this.findBu = this.findBu.bind(this);

  }

  componentDidMount() {
    this.axios.get(`${this.bu_api_url}/bu/get_all`) 
      .then(response => this.setState({ lista: response.data }))
  }

  findBu() {
    const { lista } = this.state
    var form  = this.state.formulario
    var len = lista.length
    var i=0
    console.log(form)
    console.log(lista)
    while (i<len) {
      if ( form.turno === lista[i].turno && form.uf === lista[i].UF
        && parseInt(form.zona) === lista[i].zona && parseInt(form.secao) === lista[i].secao) {
          break
      }
      i++
    }

    console.log("i=" + i)
    if (i<len) {
      this.setState({buSelecionado: i})
      console.log("buSelecionado=" + this.state.buSelecionado)
      console.log(lista[i])
      return lista[i].id
    }
    else {
      return 0
    }
  }

  handleConsultar(e) {
    e.preventDefault()
    var url = "/pages/MostrarBu/MostrarBu/" + this.findBu()
    console.log(url)
    window.location.href =  url
  }
  
  handleChange(e) {
    var formulario  = this.state.formulario
    formulario[e.target.name] = e.target.value  
  }

  handleChangeTurn(e) {
    var formulario  = this.state.formulario
    formulario[e.target.name] = e.target.value
    
    var list_bu_with_turn = this.state.lista.filter((item) => item.turno === e.target.value)
    var list_states_filtered = list_bu_with_turn.map((item) => item.UF)
    var list_states_unique = Array.from(new Set(list_states_filtered))
    this.setState({uf_opts: list_states_unique}, () => console.log("qwer", this.state.uf_opts))
  }
  
  handleChangeState(e) {
    var formulario  = this.state.formulario
    formulario[e.target.name] = e.target.value
    
    var list_bu_with_state = this.state.lista.filter((item) => item.UF === e.target.value && item.turno === formulario.turno)
    var list_zones_filtered = list_bu_with_state.map((item) => item.zona)
    var list_zones_unique = Array.from(new Set(list_zones_filtered))
    list_zones_unique.sort(function(a, b) { return a - b })
    this.setState({zona_opts: list_zones_unique}, () => console.log("qwer", this.state.zona_opts))
  }
  
  handleChangeZone(e) {
    var formulario  = this.state.formulario
    formulario[e.target.name] = e.target.value
    // eslint-disable-next-line
    var list_bu_with_zone = this.state.lista.filter((item) => item.zona == e.target.value && item.UF == formulario.uf && item.turno == formulario.turno)
    var list_sections_filtered = list_bu_with_zone.map((item) => item.secao)
    var list_sections_unique = Array.from(new Set(list_sections_filtered))
    list_sections_unique.sort(function(a, b) { return a - b })
    this.setState({secao_opts: list_sections_unique}, () => console.log("qwer", this.state.secao_opts))
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
                <Input type="select" name="secao" id="secao" onChange={this.handleChange.bind(this)}>
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
