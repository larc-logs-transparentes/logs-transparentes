import Dashboard from './pages/Dashboard';
import Buttons from './elements/Buttons';
import Alerts from './elements/Alerts';
import Grid from './elements/Grid';
import Typography from './elements/Typography';
import Cards from './elements/Cards';
import Tabs from './elements/Tabs';
import Tables from './elements/Tables';
import Breadcrumbs from './elements/Breadcrumbs';
import Forms from './elements/Forms';
import Loaders from './elements/Loaders';
import Avatars from './elements/Avatars';
import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import CmsPage from './pages/Cms';
import Widgets from './pages/Widgets';
import BlankPage from './pages/BlankPage';
import SubNav from './pages/SubNav';
import Feed from './pages/Feed';
import Modals from './elements/Modals';
import ProgressBars from './elements/ProgressBars';
import PaginationPage from './elements/Pagination';
import ErrorPage from './pages/404';

import Monitorar from './pages/Monitorar/Monitorar';
import Monitorar2 from './pages/Monitorar/MonitorarSubConsistency';
import Consultar_BU from './elements/consultar_bu';
import Auditar from './elements/auditar';
import Inserir from './elements/inserir';
import ChartDetail from './elements/chart_detail';
import MostrarBU from './elements/MostrarBU';
import Consultar_Todos from './elements/consultar_todos';
import Retotalizar from './pages/Monitorar/Retotalizar.js';
import Raizassinada from './pages/Monitorar/RaizAssinada.js';
import Mapa from './pages/Monitorar/Mapa.js';
import Root from './elements/Root';

import Atualizacao from './elements/charts';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'Detalhes',
    path: '/elements/chart_detail',
    component: ChartDetail,
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    path: '/monitorar',
    component: Monitorar
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    path: '/monitorar2',
    component: Monitorar2
    //badge: {
    //  text: 'NEW',
    //},
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
    name: 'RaizAssinada',
    path: '/raizassinada',
    component: Raizassinada
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name: 'Mapa',
    path: '/mapa',
    component: Mapa
    //badge: {
    //  text: 'NEW',
    //},
  },
  {
    name: 'Ver mais',   //Raiz assinada
    path: '/tree/root',
    component: Root,
  },
  {
    name: 'Consultar Todos BUs',
    
    path: '/elements/consultar_todos',
    component: Consultar_Todos,
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
      name: 'Consultar BU',
      path: '/elements/consultar_bu',
      component: Consultar_BU,
      //badge: {
      //  text: 'NEW',
      //},
    },
    {
      name: 'Auditar BU',
      path: '/elements/auditar',
      component: Auditar,
      //badge: {
      //  text: 'NEW',
      //},
    },
    {
      name: 'Inserir BU',
      path: '/elements/inserir',
      component: Inserir,
    },

  {
    name: 'Buttons',
    path: '/elements/buttons',
    component: Buttons,
  },
  {
    name: 'Alerts',
    path: '/elements/alerts',
    component: Alerts,
  },
  {
    name: 'Grid',
    path: '/elements/grid',
    component: Grid,
  },
  {
    name: 'Typography',
    path: '/elements/typography',
    component: Typography,
  },
  {
    name: 'Cards',
    path: '/elements/cards',
    component: Cards,
  },
  {
    name: 'Tabs',
    path: '/elements/tabs',
    component: Tabs,
  },
  {
    name: 'Tables',
    path: '/elements/tables',
    component: Tables,
  },
  {
    name: 'Progress Bars',
    path: '/elements/progressbars',
    component: ProgressBars,
  },
  {
    name: 'Pagination',
    path: '/elements/pagination',
    component: PaginationPage,
  },
  {
    name: 'Modals',
    path: '/elements/modals',
    component: Modals,
  },
  {
    name: 'Breadcrumbs',
    path: '/elements/breadcrumbs',
    component: Breadcrumbs,
  },
  {
    name: 'Forms',
    path: '/elements/forms',
    component: Forms,
  },
  {
    name: 'Loaders',
    path: '/elements/loaders',
    component: Loaders,
  },
  {
    name: 'Avatars',
    path: '/elements/avatars',
    component: Avatars,
  },
  {
    name: 'Blank',
    path: '/pages/blank',
    component: BlankPage,
  },
  {
    name: 'Sub Navigation',
    path: '/pages/subnav',
    component: SubNav,
  },
  {
    name: '404',
    path: '/pages/404',
    component: ErrorPage,
  },
  {
    name: 'Analytics',
    path: '/apps/analytics',
    component: Analytics,
  },
  {
    name: 'Activity Feed',
    path: '/apps/feed',
    component: Feed,
  },
  {
    name: 'Invoice',
    path: '/apps/invoice',
    component: Invoice,
  },
  {
    name: 'CMS',
    path: '/apps/cms',
    component: CmsPage,
  },
  {
    name: 'Widgets',
    path: '/widgets',
    component: Widgets,
  },
];

export default pageList;
