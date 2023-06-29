export default {
  top: [
    {
      name: 'Página Inicial',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Consultar BU',
      url: '/pages/ConsultarBU/ConsultarBU',
      icon: 'Package',
      //badge: {
      //  text: 'NEW',
      //},
    },
    {
      name: 'Consultar Cidade',
      url: '/mapa',
      icon: 'Package'
    },
    {
      divider: true,
    },
    {
      name: 'Histórico da árvore',
      url: '/pages/RaizAssinada/RaizAssinada',
      icon: 'Package'
    },
    {
      name: 'Recontabilizar',
      url: '/recontabilizar',
      icon: 'Package'
    },{
      divider: true,
    },
  ],
  bottom: [
    
    {
      name: 'Account',
      url: '/dashboard',
      icon: 'User'
    },
  ],
};
