import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap'
import { subscriber } from './logic/subscriber';
import { Loader } from '../../../vibe';

//Crio um state, passo pro subscriber, usar um useeffect com o proofdata, toda vez que o proofdata mudar
// o useffect vai executar oq ta dentro, toda vez q mudar, vai atualizar o que ta sendo exibido.
export default function Monitorar() {
  
  const [proofData,setProofData] =  useState([]);
  const [raiz,setRaiz] =  useState([]);
  const [contador,setContador] =  useState([]);
  const [buadd,setBU] =  useState([]);
  const [cor,setCor] =  useState([]);
  subscriber(setProofData,setRaiz,setContador,setCor,setBU)
  const [show, setShow] = useState(false);
  const i=0


  
  
  function mostrargap(raiz){
      if (raiz.length===0)
    return '20vw'
      else
      return '0.5vw'
  }
  function mostrardisplay(raiz){
    if (raiz.length===0)
      return 'none'
    else
      return 'flex'
}
function mostrarloader(raiz){
  if (raiz.length===0)
    return 'inline'
  else
    return 'none'
}
function validar0(i){
  while(i < cor.length){
    if (cor[i])
      cor[i]='Validado.'
    else
      cor[i]='#ERRO#'
    i++
}}
console.log(cor)
validar0(i)
  // Para caso eu pense em alguma solução
  // function validar (cor,i,vetorcores){
  //   while(i<cor.length){
  //     if (cor[i]===true){
  //       vetorcores.push('#81bf73')
  //       i++}
  //     else {
  //       vetorcores.push('#bd7373')
  //       i++}
  // }}
  // validar(cor,i,vetorcores)
  
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Monitorar alteração de raiz</h4>
          <div style={{textAlign:'center'}}>
            <button onClick={()=> setShow(!show)} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                Capturar transações
            </button>
          </div>
          {show? 
            <Col md={12} style={{padding:'2vw',display:mostrarloader(raiz)}}>
              <Loader type="spin" />
            </Col>
          :null}
          {show? 
          <div>
            <div style={{display:mostrardisplay(raiz),margin:'auto', textAlign:'center'}}>
              <div style={{display:'flex',gap:mostrargap(raiz),textAlign:'center',fontSize:'30px',padding:'.3vw',marginTop:'8vh',marginLeft:'auto',marginRight:'auto'}}>
                <div>
                    <h4>N° </h4>
                    {contador.map(contador => <h5 style={{color:'black',backgroundColor:'#81bf73',padding:'.4vw',borderRadius:'2px'}}>{contador}</h5>)}
                </div>
                <div>
                    <h4>Raíz Assinada</h4>
                    {raiz.map(raiz => <h5 style={{color:'black',backgroundColor:'#81bf73',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     {raiz}
                     </h5>)}
                </div>
                <div>
                  <h4>BUs</h4>
                  {buadd.map(buadd => 
                    <h5 style={{color:'black',backgroundColor:'#81bf73',padding:'.4vw'}}>
                      {buadd}
                    </h5>)}
                </div> 
                <div>
                    <h4>Status</h4>
                    {cor.map(cor => <h5 style={{color:'black',backgroundColor:'#81bf73',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     {cor}
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