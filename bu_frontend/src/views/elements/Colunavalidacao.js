import "./style_chart.css";
import React, { Component,useState } from 'react';
import { Col } from 'reactstrap';
import "react-circular-progressbar/dist/styles.css";
import { Loader } from '../../vibe/';

//      Ok, essa função vai precisar receber aquela array do bu la, e se está validado ou não
//  caso esteja validado, 

export default function Colunavalidacao() {
  const teste = "1111111111111";
  const cor='#3333';
  const validacao=1; //isso é só um exemplo pra mostrar, cada bu teria um valor individual (ou está validado ou não
  const testes = ['lalalalala\n','lalalalala\n'];
  const [show, setShow] = useState(false);


function setcor (validacao){
        if (validacao==1){
           return "#81bf73"}

        else{
           return "#ffff33";
        }; 
      }

  return (
        <div style={{ display:'flex', flexDirection:'column',margin:'auto',marginTop:'5vh'}}>
          <button onClick={()=> setShow(!show)} style={{backgroundColor:'#81bf73',borderWidth:'0',height:'7vh',borderRadius:'.2rem'}}>
              Capturar transações
            </button>
           {show? <Col md={12} style={{padding:'2vw'}}>
              <Loader type="spin" />
            </Col>:null}
            {show? <div>
               <p style={{backgroundColor:setcor(testes.validado), margin:'auto',marginTop:'5px',textAlign:"center"}}>{testes}</p>
            </div>:null}
        </div>
        
        );
  }
