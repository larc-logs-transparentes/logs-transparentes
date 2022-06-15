import React, { Component,useEffect,useState } from 'react';
import './Retotalizar.css';
import { Card, CardBody, Row, Col} from 'reactstrap';
import { Loader } from '../../../vibe';
import approval from '../../../assets/images/Approved.png';
import error from '../../../assets/images/Error.png';
import {RetotalizacaoDeBus} from './retg.js';


export default function Retotalizar() {
  const imagemaux=1
  const [show, setShow] = useState(false);
  const [showbbus, setBbus] = useState(false);
  const [showbbus2, setBbus2] = useState(false);
  const [showvbus, setVbus] = useState(false);
  const [showvbus2, setVbus2] = useState(false);
  const [showret, setRet] = useState(false);
  const [showret2, setRet2] = useState(false);
  const [busbaixados,setBUsBaixados] = useState(0);
  
  useEffect(() => {
    const nome=RetotalizacaoDeBus().then((z)=>setBUsBaixados(z))
    
  },[]);


/////////// FUNÇÕES DE TEMPO PARA IR MOSTRANDO A TELA ////////////////
  function BaixarBus(){
      setTimeout(() => {setBbus(true)}, 500);
      return}
  function BaixarBus2(){
      setTimeout(() => {setBbus2(true)}, 2000);
      return}
  function VerificarBus(){
      setTimeout(() => {setVbus(true)},750);
      return}
  function VerificarBus2(){
      setTimeout(() => {setVbus2(true)}, 2500);
      return}
  function RetotalizarBus(){
      setTimeout(() => {setRet(true)}, 750);
      return}
  function RetotalizarBus2(){
      setTimeout(() => {setRet2(true)}, 2500);
      return}
/////////////////////////////////////////////////////////////////////
    function stop1(){
      if (busbaixados[0]==0){
        return 'none'
      } else return 'block'}
    function stop2(imagem){
      if (busbaixados[1]==false){
        return 'none'
      }
      else return 'block'
    }

    
/////////////////////////////Nao entendi isso direito.///////////////////////////////////////
    function imagem(imagemaux){
      if (imagemaux==0){
        return error
      }
      if(imagemaux==1){
        return approval
      }
      
    }
    function verificacaodebus(){
      if (busbaixados[1]==false){
        return ('Ocorreram problemas')
      }
      else return ('Todos os BUs estao na árvore.')
    } 
    function selo1(){
      if (busbaixados[0]==0){
        return (error)
      }
      else return (approval)
    } 
    function selo2(){
      if (busbaixados[1]==false){
        return (error)
      }
      else return (approval)
    } 
    
    
  return (
    <div>
      <Row>
        <Col md={12}>
            <Card>
              <CardBody >
              <h4> Retotalização dos votos</h4>
                <div style={{textAlign:'center'}} >
                  <button onClick={()=> {BaixarBus(true)}} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                    Solicitar Retotalização
                  </button>
                </div>
                </CardBody>


                {/* BAIXANDO BUS */}
                
                <div style={{margin:'auto', width:'20%'}}>
                {showbbus?
                  
                  <div style={{display:'block',textAlign:'justify'}}>
                    
                    <div style={{display:'flex',alignItems:'center'}}>
                      <h5>1) Baixando BUs</h5>
                      <Row md={4} style={{padding:'2vw'}}>
                      {!showbbus2?<Loader small type="spin"/>:null}
                      {showbbus2?<img src={selo1()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />:null}
                      </Row>
                      </div>
                      {BaixarBus2()}
                      {showbbus2?<div style={{display:'flex', alignItems:'center',gap:'1vw'}}>
                      <h5>- {busbaixados[0]} BUs Baixados</h5>
                      {VerificarBus()}
                    </div>:null}
                  </div>
                  :null}
                  

                {/* VERIFICANDO OS BUS */}
                {showvbus?<div style={{display:stop1(),textAlign:'justify'}}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <h5>2) Verificando BUS</h5>
                    <Row md={4} style={{padding:'2vw'}}>
                      {!showvbus2?<Loader small type="spin"/>:null}
                      {showvbus2?<img src={selo2()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />
                    :null}
                    </Row>
                  </div>
                  {VerificarBus2()}
                  {showvbus2?<div>
                    <h5>{verificacaodebus()}</h5>
                    <h5></h5>
                    {RetotalizarBus()}
                  </div>:null}
                </div>:null}
                

                {/* RETOTALIZANDO OS BUS */}

                {showret?<div style={{display:stop1(),textAlign:'justify'}}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <h5>3) Retotalizando BUS</h5>
                    <Row md={4} style={{padding:'2vw'}}>
                      {!showret2?<Loader small type="spin"/>:null}
                      {showret2?<img src={approval} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />
                    :null}
                    </Row>
                  </div>
                  {RetotalizarBus2()}
                  {showret2?<div>
                    <h5>- Resultado final:</h5>
                    <h5>{busbaixados[2].map(({nome, votos, partido}) => (
                      <p key={nome}>{nome}: {votos} votos</p>
                    ))}
                      </h5>
                  </div>:null}
                </div>:null}

              </div>
            </Card>
        </Col>
      </Row>
      
    </div>
  );
}