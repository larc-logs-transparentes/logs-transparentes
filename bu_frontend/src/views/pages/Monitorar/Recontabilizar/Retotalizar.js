import React, {useEffect,useState } from 'react';
import './Retotalizar.css';
import { Card, CardBody, Row, Col} from 'reactstrap';
import { Loader } from '../../../../vibe';
import approval from '../../../../assets/images/Approved.png';
import error from '../../../../assets/images/Error.png';
import {RetotalizacaoDeBus} from './LogicaRetotalizacao.js';
import LoadingSpinner from '../../../elements/LoadingSpinner';


export default function Retotalizar() {
  const [showbbus, setBbus] = useState(false);
  const [showbbus2, setBbus2] = useState(false);
  const [showvbus, setVbus] = useState(false);
  const [showvbus2, setVbus2] = useState(false);
  const [showret, setRet] = useState(false);
  const [showret2, setRet2] = useState(false);
  const [busbaixados,setBUsBaixados] = useState(0);
  
  let busbaixadosobj = {
    numerobus:busbaixados[0],
    verificaqtd:busbaixados[1],
    votos:busbaixados[2],
    verificainclusao:busbaixados[3],
    root:busbaixados[4]
  }
  useEffect(() => {
    RetotalizacaoDeBus().then((z)=>setBUsBaixados(z))
  },[]);

/////////// FUNÇÕES DE TEMPO PARA IR MOSTRANDO A TELA ////////////////
  function BaixarBus(){
      console.log("bus_baixados", busbaixados)
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
      if (busbaixados[0]===0){
        return 'none'
      } else return 'block'}

/////////////////////////Funções de verificação/////////////////////////////////
    function verificacaodebus(){
      if (busbaixadosobj.verificainclusao.isTrue===false){
        return ('- A prova de inclusão de um dos BUs falhou.')
      }
      else return ('- Todos os BUs estao na árvore e não foram modificados.')
    } 
    function auxiliarverificacao(){
      if (busbaixadosobj.verificainclusao.isTrue===false){
        return (`ID do BU com problemas: ${busbaixadosobj.verificainclusao.res.BU.id}`)
      }
    }
    function verificacaoinclusaocor(){
      if (busbaixadosobj.verificainclusao.isTrue===false){
        return ('red')}else return ('black')
    } 
    function verificacaoquantidade(){
      if (busbaixadosobj.verificaqtd===false){
        return ('- A quantidade de BUs não coincide com o número de sessões')
      }
      else return ('- A quantidade de Bus corresponde ao número de sessões.')
    } 
    function verificacaoquantidadecor(){
      if (busbaixadosobj.verificaqtd===false){
        return ('red')
      }
      else return ('black')
    } 

    function selo1(){
      if (busbaixados[0]===0){
        return (error)
      }
      else return (approval)
    } 
    function selo2(){
      if (busbaixadosobj.verificaqtd===false || busbaixadosobj.verificainclusao.isTrue===false){
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
                  <button disabled={busbaixados[0] === undefined} onClick={()=> {BaixarBus(true)}} style={{backgroundColor:'#81bf73',borderWidth:'.2px',height:'7vh',borderRadius:'.2rem'}}>
                    {busbaixados[0] === undefined ? "Aguarde enquanto baixamos as informações" : "Solicitar Retotalização"}
                  </button>
                    {busbaixados[0] === null ? <LoadingSpinner /> : null}
                </div>
                </CardBody>


                {/* BAIXANDO BUS */}
                
                <div style={{margin:'auto', width:'20%'}}>
                {showbbus?
                  
                  <div style={{display:'block',textAlign:'justify'}}>
                    <h5>Raiz: {busbaixadosobj.root}</h5>
                    <div style={{display:'flex',alignItems:'center'}}>
                      
                      <h5>1) Baixando BUs</h5>
                      <Row md={4} style={{padding:'2vw'}}>
                      {!showbbus2?<Loader small type="spin"/>:null}
                      {showbbus2?<img src={selo1()} style={{ width: 32,paddingBottom:'.5vh' }} className="" alt="profile" />:null}
                      </Row>
                      </div>
                      {BaixarBus2()}
                      {showbbus2?<div style={{display:'flex', alignItems:'center',gap:'1vw'}}>
                      <h5>- {busbaixadosobj.numerobus} BUs Baixados</h5>
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
                    <h5 style={{color:verificacaoinclusaocor()}}>{verificacaodebus()}</h5>
                    <h5 style={{color:verificacaoinclusaocor()}}>{auxiliarverificacao()}</h5>
                    <h5 style={{color:verificacaoquantidadecor()}}>{verificacaoquantidade()}</h5>
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
                    <h5>{busbaixadosobj.votos.map(({codigo, votos, partido}) => (
                      <p key={codigo}>{codigo}: {votos} votos</p>
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