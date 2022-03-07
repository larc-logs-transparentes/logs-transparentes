import { Button } from './Button.js'; 
import { Turno } from './Turno.js';
import { Secao } from './Secao.js';
import { Zona } from './Zona.js';
import { UF } from './UF.js';
import { ListComponent } from './ListComponent.js'; 

function App() { 
  
  function addComponent() {
    
  } 
  
  return ( 
    
    <div> 
    <ListComponent text="Consulta de Boletins de URNA"/> 
    <div className="row">
      <Turno  />
      <Secao />
    </div>

    <div className="row">
      <Zona />
      <UF />
    </div>
      
      
      <Button onClick={addComponent} text="Buscar"/> 
      
      
    </div> 
    
  ) 
  
} 

export default App;