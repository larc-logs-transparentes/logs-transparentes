import React, { useEffect,useState } from 'react';
import { Card, CardBody } from 'reactstrap'
import { provaDeConsistencia } from '../logic/consistencyProof';
import { getRootAll } from '../../../../api/bu.api';
import {baixarRoots} from './Roots.js';

export default function Raizassinada() {
  getRootAll()
  const [vetorvalidar,setVetor] = useState([]);
  const [rootsbaixadas,setRootsBaixadas] = useState([]);
  const [rootbaixada,setRootBaixada] = useState([]);
  const i=0
  const [show, setShow] = useState(false);
  useEffect(() => {
    baixarRoots().then((z)=>setRootsBaixadas(z))
    
  },[]);

  function validar(i){
    let vetorvalidar=[]
    let saveRootBaixada=[]
    while(i < rootsbaixadas.length){
      saveRootBaixada.push(rootsbaixadas[i])
      let resultadoProva=provaDeConsistencia(rootsbaixadas[i])
      if (resultadoProva===true){
        vetorvalidar[i]='Correta'}
      if ( resultadoProva === false ){
        vetorvalidar[i]='#ERRO#'
        resultadoProva=0}
      i++
      setShow(true)
      setRootBaixada(rootbaixada=>saveRootBaixada)}
    return vetorvalidar
  }
  
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Histórico da árvore de BUs</h4>
          <div style={{textAlign:'center'}}>
          <button disabled={show} onClick={()=> setVetor(vetorvalidar=>validar(i))} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                Verificar integridade 
            </button>
          </div>
          <div>
            <div style={{margin:'auto', textAlign:'center'}}>
              <div style={{display:'flex-column',margin:'auto', textAlign:'center',position:'static',marginTop:'30vh'}}>
              <div style={{display:'flex',position:'relative',gap:'0.5vw',textAlign:'center',fontSize:'30px',padding:'.3vw',marginTop:'-20vh',marginLeft:'auto',marginRight:'auto'}}>
                <div >
                    <h5>ID</h5>
                    {rootsbaixadas.map((rootsbaixadas, i) => <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px'}}>{rootsbaixadas._id}</h5>)}
                </div>
                <div>
                    <h5>Raiz parcial da árvore</h5>
                    {rootsbaixadas.map((rootsbaixadas, i)=> <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     <small>{rootsbaixadas.second_hash}</small>
                     </h5>)}
                </div>
                <div>
                  <h5>Tamanho</h5>
                  {rootsbaixadas.map((rootsbaixadas, i) => 
                    <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',position:'flex'}}>
                      {rootsbaixadas.tree_size_2}
                    </h5>)}
                </div> 
                <div>
                <h5>Assinatura</h5>
                  {rootsbaixadas.map((rootsbaixadas, i)=> 
                    <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      <small>{'3c3b72a69d0e25c9b2abc0d636'}</small>
                    </h5>)}
                </div>
                <div>
                <h5>Validação</h5>
                  {vetorvalidar.map((vetorvalidar, i)=> 
                    <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {vetorvalidar}
                    </h5>)}
                </div>
              </div>
              <div style={{display:'inline-block',columnCount:'1',gap:'6vw', marginTop:'10vw',marginRight:'20vw',textAlign:'start',alignContent:'start'}}>
              {rootbaixada.map( ( {_id,tree_size_1,tree_size_2,first_hash,second_hash,consistency_path,log_id,__v} ) => {
                return <p key={_id}>log_id:{log_id}<br/> tree_size_1 :{tree_size_1}<br/>tree_size_2 :{tree_size_2}<br/>first_hash :{first_hash}<br/>
                second_hash:{second_hash}<br/>consistency_path:{consistency_path.map(consistency_path => <li>{consistency_path}</li>)}
                <br/> ----------------------------------------------------<br/></p>})}
              </div>
            </div>
            </div>
          </div>
          
        </CardBody>
      </Card>

      
    </React.Fragment>
  );
}