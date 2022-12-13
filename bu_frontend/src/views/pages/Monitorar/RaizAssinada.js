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
  const [rootbaixada,setRootBaixada] = useState([]);
  const i=0
  const [show, setShow] = useState(false);
  useEffect(() => {
    const nome=baixarRoots().then((z)=>setRootsBaixadas(z))
    
  },[]);

  function validar(i){
    let vetorvalidar=[]
    let saveRootBaixada=[]
    while(i < rootsbaixadas.length){
      saveRootBaixada.push(rootsbaixadas[i])
      let resultadoProva=provaDeConsistencia(rootsbaixadas[i])
      if (resultadoProva===true){
        vetorvalidar[i]='Validado'}
      if ( resultadoProva === false ){
        vetorvalidar[i]='#ERRO#'
        resultadoProva=0}
      i++
      setShow(true)
      setRootBaixada(rootbaixada=>saveRootBaixada)}
    return vetorvalidar
  }


  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4>Nessa página, você tem todo o histórico da árvore de BUs. Apertando o botão, você consegue verificar que nenhum dado foi removido da árvore entre cada atualização.</h4>
          <div style={{textAlign:'center'}}>
          <button disabled={show} onClick={()=> setVetor(vetorvalidar=>validar(i))} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                Validar Consistência da Árvore.
            </button>
          </div>
          <div>
            <div style={{margin:'auto', textAlign:'center'}}>
              <div style={{display:'flex-column',margin:'auto', textAlign:'center',position:'static',marginTop:'30vh'}}>
              <div style={{display:'flex',position:'relative',gap:'0.5vw',textAlign:'center',fontSize:'30px',padding:'.3vw',marginTop:'-20vh',marginLeft:'auto',marginRight:'auto'}}>
                <div >
                    <h5>ID</h5>
                    {rootsbaixadas.map(rootsbaixadas => <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px'}}>{rootsbaixadas._id}</h5>)}
                </div>
                <div>
                    <h5>Raiz Parcial</h5>
                    {rootsbaixadas.map(rootsbaixadas=> <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',borderRadius:'2px',textAlign:'justify'}}>
                     {rootsbaixadas.second_hash}
                     </h5>)}
                </div>
                <div>
                  <h5 style={{width:'170px'}}>Tamanho da Árvore</h5>
                  {rootsbaixadas.map(rootsbaixadas => 
                    <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw',position:'flex'}}>
                      {rootsbaixadas.tree_size_2}
                    </h5>)}
                </div> 
                <div>
                <h5>Validação</h5>
                  {vetorvalidar.map(vetorvalidar=> 
                    <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {vetorvalidar}
                    </h5>)}
                </div>
                <div>
                <h5>Assinatura</h5>
                  {vetorvalidar.map(vetorvalidar=> 
                    <h5 style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {'3c3b72a69d0e25c9b2abc0d636'}
                    </h5>)}
                </div>
              </div>
              <div style={{display:'inline-block',columnCount:'3',gap:'6vw', marginTop:'10vw',marginRight:'20vw',textAlign:'start',alignContent:'start'}}>
              {rootbaixada.map( ( {_id,tree_size_1,tree_size_2,first_hash,second_hash,consistency_path,log_id,__v} ) => {
                return <p style={{width:'15vw'}} key={_id}>log_id:{log_id}<br/> tree_size_1 :{tree_size_1}<br/>tree_size_2 :{tree_size_2}<br/>first_hash :{first_hash}<br/>
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