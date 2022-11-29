import React, { useEffect,useState } from 'react';
import { Card, CardBody, Col, Row, Button,Table } from 'reactstrap'
import { subscriber } from './logic/subscriberConsistency';
import { provaDeConsistencia } from './logic/subscriberConsistency';
import { Loader } from '../../../vibe';
import { getRootAll } from '../../../api/bu.api';
import {baixarRoots} from './Roots.js';
export default function Raizassinada() {
  getRootAll()
  const [vetorvalidar,setVetor] = useState([]);
  const [rootsbaixadas,setRootsBaixadas] = useState([]);
  const i=0
  useEffect(() => {
    const nome=baixarRoots().then((z)=>setRootsBaixadas(z))
    
  },[]);

  function validar(i){
    let vetorvalidar=[]
    while(i < rootsbaixadas.length){
      let resultadoProva=provaDeConsistencia(rootsbaixadas[i])
      if (resultadoProva===true){
        vetorvalidar[i]='Validado'}
      if ( resultadoProva === false ){
        vetorvalidar[i]='#ERRO#'
        resultadoProva=0}
      i++}
    return vetorvalidar
  }


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Monitorar consistência entre as raízes</h4>
          <div style={{textAlign:'center'}}>
            <button onClick={()=> setVetor(vetorvalidar=>validar(i))} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                Validar Raízes
            </button>
          </div>
          <div>
            <div style={{margin:'auto', textAlign:'center'}}>
              <div style={{display:'flex',textAlign:'center',fontSize:'30px',padding:'.3vw',marginTop:'8vh',marginLeft:'auto',marginRight:'auto'}}>
              </div>
              <div style={{display:'flex',margin:'auto', textAlign:'center'}}>
              <div style={{display:'flex',gap:'0.5vw',textAlign:'center',fontSize:'30px',padding:'.3vw',marginTop:'8vh',marginLeft:'auto',marginRight:'auto'}}>
                <div>
                    <h4>ID</h4>
                    {rootsbaixadas.map(rootsbaixadas => <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px'}}>{rootsbaixadas._id}</h5>)}
                </div>
                <div>
                    <h4>Raiz</h4>
                    {rootsbaixadas.map(rootsbaixadas=> <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     {rootsbaixadas.second_hash}
                     </h5>)}
                </div>
                <div>
                  <h4>BUs Adicionados</h4>
                  {rootsbaixadas.map(rootsbaixadas => 
                    <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {rootsbaixadas.tree_size_2-rootsbaixadas.tree_size_1}
                    </h5>)}
                </div> 
                <div>
                <h4>Validação</h4>
                  {vetorvalidar.map(vetorvalidar=> 
                    <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {vetorvalidar}
                    </h5>)}
                </div>
              </div>
            </div>
            </div>
          </div>
          
        </CardBody>
      </Card>
      
    </React.Fragment>
  );
}