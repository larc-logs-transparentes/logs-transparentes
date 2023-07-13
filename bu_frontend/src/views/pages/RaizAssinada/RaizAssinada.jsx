import React, { useEffect,useState } from 'react';
import { Card, CardBody } from 'reactstrap'
import { getRootAll } from '../../../api/bu.api';
import { getAllRoots } from '../../../api/merkletree.api';
import {baixarRoots} from './Roots.js';
import ReactJson from 'react-json-view'
export default function Raizassinada() {
  getAllRoots()
  const [vetorvalidar,setVetor] = useState([]);
  const [rootsbaixadas,setRootsBaixadas] = useState([]);
  const [rootbaixada,setRootBaixada] = useState([]);
  const [hashVector,setHashVector] = useState([]);
  const i=0
  const [show, setShow] = useState(false);
  useEffect(() => {
    baixarRoots().then((z) => {
      setRootsBaixadas(z);
      // setHashVector(
      //   z.map((root) => {
      //     let hash = '';
      //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      //     for (let i = 0; i < 26; i++) {
      //       const randomIndex = Math.floor(Math.random() * characters.length);
      //       hash += characters[randomIndex];
      //     }
      //     return hash;
      //   })
      // );
    });
  }, []);

  function validar(i){
    let vetorvalidar=[]
    let saveRootBaixada=[]
    while(i < rootsbaixadas.length){
      saveRootBaixada.push(rootsbaixadas[i])
      let resultadoProva=1
      // let resultadoProva=provaDeConsistencia(rootsbaixadas[i])
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
        <CardBody >
          <h4>Histórico da árvore de BUs</h4>
          <div style={{textAlign:'center'}}>
          <button disabled={show} onClick={()=> setVetor(vetorvalidar=>validar(i))} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                Verificar integridade 
            </button>
          </div>
          <div>
            <div style={{marginLeft:'20%', textAlign:'center'}}>
              <div style={{display:'flex-column', textAlign:'center',position:'static',marginTop:'30vh'}}>
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
                  {hashVector.map((hashVector, i)=> 
                    <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      <small>{hashVector}</small>
                    </h5>)}
                </div>
                {/* <div>
                <h5>Validação</h5>
                  {vetorvalidar.map((vetorvalidar, i)=> 
                    <h5 key={i} style={{color:'black',backgroundColor:'#c4c4c4',padding:'.4vw'}}>
                      {vetorvalidar}
                    </h5>)}
                </div> */}
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