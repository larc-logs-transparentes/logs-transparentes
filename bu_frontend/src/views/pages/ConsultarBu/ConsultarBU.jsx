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
import { getUFs,getTurno } from '../../../api/bu.api';

class ConsultarBU extends Component {
  axios = require('axios')
  bu_api_url = require('../../../config.json').bu_api_url

  constructor() {
    super()
    this.state = {
                  turno_opts: [],
                  uf_opts: undefined,
                  zona_opts: undefined,
                  secao_opts: undefined,
                  turno_selection: [],
                  uf_selection: undefined,
                  zona_selection: undefined,
                  secao_selection: undefined,
                  buselection: undefined,
                }
    this.findBu = this.findBu.bind(this);

  }

  componentDidMount() {
    this.axios.get(`${this.bu_api_url}/bu/distinct_turno`)
      .then(response => {
        this.setState({ turno_opts: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  findBu(turno_selection, uf_selection, zona_selection, secao_selection) {
    this.axios.get(`${this.bu_api_url}/bu/electioninfo?turno=${turno_selection}&UF=${uf_selection}&zona=${zona_selection}&secao=${secao_selection}`)
      .then(response => {
        console.log(response.data); // Log the entire response to inspect its structure
        // ...
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  

  handleConsultar(e) {
    e.preventDefault()
    var url = "/pages/MostrarBu/MostrarBu/" + this.findBu()
    console.log(url)
    window.location.href =  url
  }
  

  handleChangeTurn(e) {
    var selectedTurno = e.target.value; // Get the selected value from the event
    this.setState({ turno_selection: selectedTurno }, () => {
      console.log(this.state.turno_selection);
  
      // Now that the state is updated, make the network request
      this.axios.get(`${this.bu_api_url}/bu/distinct_uf?turno=${this.state.turno_selection}`)
        .then(response => {
          this.setState({ uf_opts: response.data });
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  
  handleChangeUF(e) {
    var selectedUF = e.target.value; 
    this.setState({ uf_selection: selectedUF }, () => {
      console.log(this.state.uf_selection);
      this.axios.get(`${this.bu_api_url}/bu/distinct_zona?turno=${this.state.turno_selection}&uf=${this.state.uf_selection}`)	
        .then(response => {
          this.setState({ zona_opts: response.data });
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  
  handleChangeZona(e) {
    var selectedZona = e.target.value;
    this.setState({ zona_selection: selectedZona }, () => {
      console.log(this.state.zona_selection);
      this.axios.get(`${this.bu_api_url}/bu/distinct_secao?turno=${this.state.turno_selection}&uf=${this.state.uf_selection}&zona=${this.state.zona_selection}`)	
        .then(response => {
          this.setState({ secao_opts: response.data });
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  handleChangeSecao(e) {
    var selectedSecao = e.target.value;
    this.setState({ secao_selection: selectedSecao }, () => {
      console.log(this.state.secao_selection);
    });
  }


  render() {

    var turnoArr = this.state.turno_opts || []; 
    var ufArr = this.state.uf_opts || [];       
    var zonaArr = this.state.zona_opts || [];    
    var secaoArr = this.state.secao_opts || []; 



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
                <Input type="select" name="uf" id="uf" onChange={this.handleChangeUF.bind(this)}>
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
                <Input type="select" name="zona" id="zona" onChange={this.handleChangeZona.bind(this)}>
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
