import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap';
import { Loader } from '../../../vibe';

//Crio um state, passo pro subscriber, usar um useeffect com o proofdata, toda vez que o proofdata mudar
// o useffect vai executar oq ta dentro, toda vez q mudar, vai atualizar o que ta sendo exibido.
export default function Retotalizar() {
  
  const [show, setShow] = useState(false);


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Retotalização dos BUs</h4>
          <div style={{textAlign:'center'}}>
            <button onClick={()=> setShow(!show)} style={{backgroundColor:'#81bf73',borderWidth:'0',height:'7vh',borderRadius:'.2rem'}}>
                Realizar Retotalização
            </button>
          </div>
          {show? 
            <Col md={12} style={{padding:'2vw'}}>
              <Loader type="spin" />
            </Col>
          :null}

          
        </CardBody>
      </Card>
      
    </React.Fragment>
  );
}