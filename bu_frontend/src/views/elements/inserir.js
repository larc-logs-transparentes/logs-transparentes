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
  FormText
} from 'reactstrap';
import laptopImage from '../../assets/images/laptop.jpeg';
import PageLoaderContext from '../../vibe/components/PageLoader/PageLoaderContext';

class Inserir extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>Inserir Boletins de Urna - Turno</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Turno</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1º</option>
                  <option>2º</option>
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Inserir Boletins de Urna - Estado</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">UF</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>SP</option>
                  <option>MG</option>
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Inserir Boletins de Urna - Zona Eleitoral</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Zona</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>SP</option>
                  <option>MG</option>
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Inserir Boletins de Urna - Seção Eleitoral</CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Seção</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>SP</option>
                  <option>MG</option>
                </Input>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Inserir Boletins de Urna - Boletim de Urna</CardHeader>
            <CardBody>
            <FormGroup>
              <Label for="exampleFile">Arquivo Boletim de Urna</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                  Carregar Boletim de Urna para o banco de dados
                </FormText>
            </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Inserir Boletins de Urna - Consulta</CardHeader>
            <CardBody>
              <PageLoaderContext.Consumer>
                {context => (
                  <Button onClick={context.loadPage}>Inserir</Button>
                )}
              </PageLoaderContext.Consumer>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
    );
  }
}

export default Inserir;
