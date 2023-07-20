import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap'
import { getAllRoots } from '../../../api/merkletree.api';
import ReactJson from 'react-json-view'
import ProvaDeConsistencia from './ProvaDeConsistencia.jsx'
export default function Raizassinada() {
  const [vetorvalidar, setVetor] = useState([]);
  const [rootsbaixadas, setRootsBaixadas] = useState([]);
  const [rootbaixada, setRootBaixada] = useState([]);
  const [hashVector, setHashVector] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllRoots().then((z) => {
      console.log('rootsbaixadas:', z);
      setRootsBaixadas(z.roots);
    });
  }, []);
  

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Histórico da árvore de BUs</h4>
          <div style={{ textAlign: 'center' }}>
            <button disabled={show} onClick={() => setVetor(vetorvalidar => 1)} style={{ backgroundColor: '#81bf73', borderWidth: '.2px', height: '7vh', borderRadius: '.2rem' }}>
              Verificar integridade
            </button>
            <ProvaDeConsistencia/>
          </div>
          <div>
            <div style={{ overflowX: 'scroll', textAlign: 'center', padding:'4rem'}}>
            <div style={{ marginTop: '30vh', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5vw', fontSize: '30px', padding: '.3vw', marginTop: '-20vh', marginRight: 'auto' }}>
              <div style={{ width: '40%' }}>
                <h5>Assinatura</h5>
                {rootsbaixadas && rootsbaixadas.map((root, i) => (
                  <h5 key={i} style={{ color: 'black', backgroundColor: '#c4c4c4', padding: '.4vw', borderRadius: '2px', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                    {root.signature}
                  </h5>
                ))}
              </div>
                <div style={{ width: '45%' }}>
                  <h5>Raiz</h5>
                  {rootsbaixadas && rootsbaixadas.map((root, i) => (
                    <h5 key={i} style={{ color: 'black', backgroundColor: '#c4c4c4', padding: '.4vw', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                      {root.value}
                    </h5>
                  ))}
                </div>
                <div style={{ width: '5%' }}>
                  <h5>Tamanho</h5>
                  {rootsbaixadas && rootsbaixadas.map((root, i) => (
                    <h5 key={i} style={{ color: 'black', backgroundColor: '#c4c4c4', padding: '.4vw', borderRadius: '2px', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                      <small>{root.tree_size}</small>
                    </h5>
                  ))}
                </div>
              </div>
            </div>
            <div style={{gap:'6vw', marginTop:'10vw',textAlign:'start',alignContent:'start', width:'100%'}}>
                {show?<ReactJson collapsed displayDataTypes={false} src={rootbaixada} />:null}
            </div> 
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}