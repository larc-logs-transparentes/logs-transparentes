import React, { Component } from 'react';

import { Card, CardBody, Row, Col, CardHeader,
  CardFooter,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import monitoresImage from '../../assets/images/monitores.png';
import Chart from '../../views/elements/charts';
class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    const cardStyles = {
      //padding: '50px 0 70px',
      marginLeft: '25%'
    };

    return (
      <div>
        <Row>
          <Col md={6}>
            <div className="home-hero" style={heroStyles}>
              <h1>Site oficial do Logs Transparentes</h1>
              <p className="text-muted">
                Seja Bem Vindo
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
              <Card>
                <Chart/>
                <CardBody>
                  <CardTitle>Último resultado parcial</CardTitle>
                  <Link to="elements/chart_detail">
                  <Button>Detalhes</Button>
                  </Link>
                </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
              <Card>
                <CardBody>
                  <CardTitle>Clique aqui para baixar a prova do Último resultado parcial(raiz assinada)</CardTitle>
                  <CardText>
                    
                  </CardText>
                  <Link to="tree/root">
                  <Button>Ver Mais</Button>
                  </Link>
                </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
              <Card>
                <CardBody>
                  <CardText>
                  <img src={monitoresImage} style={{ width: 1000 }} className="" alt="profile" />
                  </CardText>
                  <Button>Ver Mais</Button>
                </CardBody>
              </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
