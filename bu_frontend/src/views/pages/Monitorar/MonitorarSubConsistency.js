import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap'
import { subscriber } from './logic/subscriberConsistency';
import { Loader } from '../../../vibe';

//Crio um state, passo pro subscriber, usar um useeffect com o proofdata, toda vez que o proofdata mudar
// o useffect vai executar oq ta dentro, toda vez q mudar, vai atualizar o que ta sendo exibido.
export default function Monitorar() {
  const [secondHash,setSecondHash] =  useState([]);
  const [logId,setLogId] =  useState([]);
  const [busAdicionados, setBusAdicionados] = useState([]);
  const [proof, setProof] = useState([]);
  subscriber(setSecondHash,setLogId,setBusAdicionados, setProof)
  const [show, setShow] = useState(false);
  const [state,setState] = useState(false);
  const i=0

  validar0(i)
  function validar0(i){
    while(i <= busAdicionados.length){
      if (proof[i]==true){
        proof[i]='Validado'}
      if (proof[i]==false){
        proof[i]='#ERRO#'}
      i++}
  }
  //console.log(busAdicionados)

  function mostrargap(secondHash){
      if (secondHash.length===0)
    return '20vw'
      else
      return '0.5vw'
  }
  function mostrardisplay(secondHash){
    if (secondHash.length===0)
      return 'none'
    else
      return 'flex'
}
function mostrarloader(secondHash){
  if (secondHash.length===0)
    return 'inline'
  else
    return 'none'
}

function status(){
  if (secondHash.length!=0){
    setTimeout(() => {setState(!state)}, 2500);} /// O timeout funcionou com 0 segundos para esse caso, talvez deva aumentar para outros.
    return}

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Monitorar alteração de secondHash</h4>
          <div style={{textAlign:'center'}}>
            <button onClick={()=> setShow(true)} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                Capturar transações
            </button>
          </div>
          {show? 
            <Col md={12} style={{padding:'2vw',display:mostrarloader(secondHash)}}>
              <Loader type="spin" />
            </Col>
          :null}
          {show? 
          <div>
            <div style={{display:mostrardisplay(secondHash),margin:'auto', textAlign:'center'}}>
              <div style={{display:'flex',gap:mostrargap(secondHash),textAlign:'center',fontSize:'30px',padding:'.3vw',marginTop:'8vh',marginLeft:'auto',marginRight:'auto'}}>
                <div>
                    <h4>Log ID </h4>
                    {logId.map(logId => <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px'}}>{logId}</h5>)}
                </div>
                <div>
                    <h4>Second Hash</h4>
                    {secondHash.map(secondHash => <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     {secondHash}
                     </h5>)}
                </div>
                <div>
                  <h4>BUs Adicionados</h4>
                  {busAdicionados.map(busAdicionados => 
                    <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {busAdicionados}
                    </h5>)}
                </div> 
                <div>
                  {status()}
                    <h4>Status</h4>
                    {proof.map(proof => <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     {proof}
                     </h5>)}
                     
                </div>
              </div>
            </div>
          </div>
          :null}
          
        </CardBody>
      </Card>
      
    </React.Fragment>
  );
}