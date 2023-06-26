import Dashboard from './pages/Dashboard';
import MostrarBU from './elements/MostrarBU';
import MostrarBUProva from './elements/MostrarBUProva';
import Retotalizar from './pages/Recontabilizar/Retotalizar.jsx';
import Raizassinada from './pages/Raiz/RaizAssinada.js';
import Mapa from './pages/Mapa/Mapa.js';
import MapaProva from './pages/Mapa/MapaProva.js';
import Root from './elements/Root';

import VerificacaoCompleta from './pages/VerificacaoCompleta/VerificacaoCompleta.js';
import Consultar_BU from './elements/consultar_bu';
// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  }, 
  {
    name: 'Recontabilizar',
    path: '/recontabilizar',
    component: Retotalizar
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name: 'Histórico da árvore',
    path: '/raizassinada',
    component: Raizassinada
    //badge: {
    //  text: 'NEW',
    //},
  },
 
  {
    name: 'Mapa',
    path: '/mapa',
    component: Mapa,

    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name: 'Mapa Prova',
    path: '/mapa/provaparcial/:id_inicial/:id_final',
    component: MapaProva,

    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name: 'Verificação completa de resultado da cidade',
    path: '/mapa/verificacaoCompleta/:id_inicial/:id_final',
    component: VerificacaoCompleta
  },
  {
    name:'Verificação completa Prova',
    path:'/elements/verificacaoCompletaprova/:id_inicial/:id_final',
    component: MostrarBUProva,
  },
  {
    name: 'Ver mais',   //Raiz assinada
    path: '/tree/root',
    component: Root,
  },
  {
    name: 'Consultar Todos BUs',
    
    path: '/elements/consultar_bu',
    component: Consultar_BU,
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name:'Boletim de Urna - Resultado da Consulta',
    path:'/elements/mostrarbu/:id',
    component: MostrarBU,
  },
  {
    name:'Boletim de Urna - Resultado da Consulta',
    path:'/elements/mostrarbuprova/:id',
    component: MostrarBUProva,
  },
];

export default pageList;
