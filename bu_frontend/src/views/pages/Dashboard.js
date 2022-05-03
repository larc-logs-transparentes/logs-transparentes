import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../../assets/images/responsive-feature.svg';
import urna from '../../assets/images/urna.jpg';
import { Card, CardBody, Row, Col, CardHeader,
  CardFooter,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import laptopImage from '../../assets/images/laptop.jpeg';

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
              <h1>Site oficial do TSE</h1>
              <p className="text-muted">
                Seja Bem Vindo
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          
          <Col md={6} style={cardStyles}>
          <Card>
                <CardImg src={urna} top width="100%" alt="laptop" />
                <CardBody>
                  <CardTitle>Quantidade de BUs totalizadas até o momento</CardTitle>
                  <CardText>
                    76%
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
              <Card>
                <CardBody>
                  <CardTitle>Último resultado parcial</CardTitle>
                  <CardText>
                    Partido X
                    Partido Y
                  </CardText>
                  <Button>Button</Button>
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
                    Exemplo card notícia
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
