import Dashboard from './pages/Dashboard';
import MostrarBU from './pages/MostrarBu/MostrarBU.jsx';
import MostrarBUProva from './pages/MostrarBuProva/MostrarBUProva.jsx';
import Retotalizar from './pages/Recontabilizar/Retotalizar.jsx';
import Raizassinada from './pages/RaizAssinada/RaizAssinada.jsx';
import Mapa from './pages/Mapa/Mapa.js';
import MapaProva from './pages/Mapa/MapaProva.js';
import Root from './pages/RootPage/Root.jsx';

import VerificacaoCompleta from './pages/VerificacaoCompleta/VerificacaoCompleta.js';
import ConsultarBU from './pages/ConsultarBu/ConsultarBU.jsx';
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
    path: '/pages/RaizAssinada/RaizAssinada',
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
    path: '/pages/RootPage/Root.jsx',
    component: Root,
  },
  {
    name: 'Consultar Todos BUs',
    
    path: '/pages/ConsultarBU/ConsultarBU',
    component: ConsultarBU,
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name:'Boletim de Urna - Resultado da Consulta',
    path:'/pages/MostrarBu/MostrarBu/:id',
    component: MostrarBU,
  },
  {
    name:'Boletim de Urna - Resultado da Consulta',
    path:'/pages/MostrarBuProva/MostrarBuProva/:id',
    component: MostrarBUProva,
  },
];

export default pageList;
