import { Button } from './Button.js'; 
//import { Turno } from './Turno.js';
import { Secao } from './Secao.js';
import { Zona } from './Zona.js';
import { UF } from './UF.js';
//import { ListComponent } from './ListComponent.js'; 

export const faqs = [
    {
        question: "Primeiro Turno",
        answer:<>     
                    
                    <Secao />
                    <Zona />
                    <UF />                
                    <Button /*onClick={addComponent}*/ text="Consultar Boletim de Urna"/> 
                
                </>
    },
    {
        question: "Segundo Turno",
        answer: <>     
                    
                    <Secao />
                    <Zona />
                    <UF />                
                    <Button /*onClick={addComponent}*/ text="Consultar Boletim de Urna"/> 
                
                </>
    },
];