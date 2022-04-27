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
import DragAndDrop from '../../views/elements/DragAndDrop';

class Inserir extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <DragAndDrop/>
      

      <Row>
        <Col md={6} style={{marginLeft: '20%'}}>
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
      </>
    );
  }
}

export default Inserir;
