import Dashboard from './pages/Dashboard';
import MostrarBU from './elements/MostrarBU';
import Retotalizar from './pages/Monitorar/Retotalizar.js';
import Raizassinada from './pages/Monitorar/RaizAssinada.js';
import Mapa from './pages/Monitorar/Mapa/Mapa.js';
import Root from './elements/Root';
import VerificacaoCompleta from './pages/Monitorar/VerificacaoCompleta/VerificacaoCompleta.js';
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
    name: 'Verificação completa de resultado da cidade',
    path: '/mapa/verificacaoCompleta/:id_inicial/:id_final',
    component: VerificacaoCompleta
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
];

export default pageList;
