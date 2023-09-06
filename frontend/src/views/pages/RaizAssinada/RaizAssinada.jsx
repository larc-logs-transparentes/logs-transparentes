import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getAllRoots } from '../../../api/merkletree.api';
import ReactJson from 'react-json-view';
import ProvaDeConsistencia from './ProvaDeConsistencia.jsx';
import { verifyRootHistoryConsistency } from '../../../services/verifyRootHistoryConsistency';

export default function Raizassinada() {
  const [validate, setValidate] = useState(false);
  const [rootsbaixadas, setRootsBaixadas] = useState([]);
  const [show, setShow] = useState(true);
  const [color, setColor] = useState('grey');
  const [selectedSignature, setSelectedSignature] = useState(null);

  useEffect(() => {
    getAllRoots().then((z) => {
      console.log('rootsbaixadas:', z);
      setRootsBaixadas(z.roots);
      setShow(false);
    });
  }, []);

  async function checkProvaDeConsistencia() {
    const result = await verifyRootHistoryConsistency();
    if (result === 'success') {
      setColor('#85c96f');
      setValidate(true);
      setShow(true);
    } else {
      setColor('#8f454a');
      setValidate(false);
      setShow(true);
    }
  }

  // Function to handle signature click
  function handleSignatureClick(signature) {
    setSelectedSignature(signature);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Histórico da árvore de BUs</h4>
          <div style={{ textAlign: 'center' }}>
            <button disabled={show} onClick={checkProvaDeConsistencia} style={{ backgroundColor: '#81bf73', borderWidth: '.2px', height: '7vh', borderRadius: '.2rem' }}>
              Verificar integridade
            </button>
            <ProvaDeConsistencia />
          </div>
          <div>
            <div style={{ overflowX: 'scroll', textAlign: 'center', padding: '4rem' }}>
              <div style={{ marginTop: '30vh', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5vw', fontSize: '30px', padding: '.3vw', marginTop: '-20vh', marginRight: 'auto' }}>
                  <div style={{ width: '40%' }}>
                    <h5>Assinatura</h5>
                    {rootsbaixadas && rootsbaixadas.map((root, i) => (
                      <h5 key={i} style={{ color: 'black', backgroundColor: color, padding: '.4vw', borderRadius: '2px', overflowX: 'scroll', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => handleSignatureClick(root.signature)}>
                        {root.signature}
                      </h5>
                    ))}
                  </div>
                  <div style={{ width: '45%' }}>
                    <h5>Raiz</h5>
                    {rootsbaixadas && rootsbaixadas.map((root, i) => (
                      <h5 key={i} style={{ color: 'black', backgroundColor: color, padding: '.4vw', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                        {root.value}
                      </h5>
                    ))}
                  </div>
                  <div style={{ width: '5%' }}>
                    <h5>Tamanho</h5>
                    {rootsbaixadas && rootsbaixadas.map((root, i) => (
                      <h5 key={i} style={{ color: 'black', backgroundColor: color, padding: '.4vw', borderRadius: '2px', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                        <small>{root.tree_size}</small>
                      </h5>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ gap: '6vw', marginTop: '10vw', textAlign: 'start', alignContent: 'start', width: '100%' }}>
                {show ? <ReactJson collapsed displayDataTypes={false} src={rootsbaixadas} /> : null}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* Modal */}
      {selectedSignature && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedSignature(null)}>&times;</span>
            <h3>Assinatura</h3>
            <p>{selectedSignature}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
