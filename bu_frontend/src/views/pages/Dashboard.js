import React, { Component } from 'react';

import { Card, CardBody, Row, Col,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import monitoresImage from '../../assets/images/monitores.png';
import { getTrustedRoot } from '../../api/merkletree.api.js';

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      root: null,
    }
  }

  async componentDidMount() {
    const root = await getTrustedRoot()
    console.log(root)
    this.setState({ root: root.value })
  }

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
              {/* <Card>
                <Chart/>
                <CardBody>
                  <CardTitle>Último resultado parcial</CardTitle>
                  <Link to="elements/chart_detail">
                  <Button>Detalhes</Button>
                  </Link>
                </CardBody>
              </Card> */}
          </Col>
        </Row>
        <Row>
          <Col md={6} style={cardStyles}>
              <Card>
                <CardBody>
                  <CardTitle>Código global da eleição:</CardTitle>
                  <CardText>
                    {this.state.root}
                  </CardText>
                  <CardTitle>Verificado Por: </CardTitle>
                  <CardText>
                    Universidade de São Paulo
                  </CardText>

                  <Link to="pages/RootPage/Root.jsx">
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
