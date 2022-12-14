export default {
  top: [
    {
      name: 'Página Inicial',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Consultar BU',
      url: '/elements/consultar_bu',
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
    // {
    //   name: 'Auditar BU',
    //   url: '/elements/auditar',
    //   icon: 'Package',
    //   //badge: {
    //   //  text: 'NEW',
    //   //},
    // },
    {
      divider: true,
    },
    {
      name: 'Histórico da árvore',
      url: '/raizassinada',
      icon: 'Package'
    },
    {
      name: 'Recontabilizar',
      url: '/recontabilizar',
      icon: 'Package'
    }
  ],
  bottom: [
    
    {
      name: 'Account',
      url: '/dashboard',
      icon: 'User'
    },
  ],
};
