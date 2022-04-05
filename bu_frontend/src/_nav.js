export default {
  top: [
    {
      name: 'Página Inicial',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Consultar BU',
      url: '/tse/consulta_bu',
      icon: 'Package',
      //badge: {
      //  text: 'NEW',
      //},
    },
    {
      name: 'Auditar BU',
      url: '/tse/auditar',
      icon: 'Package',
      //badge: {
      //  text: 'NEW',
      //},
    },
    {
      divider: true,
    },
    {
      name: 'Inserir BU',
      url: '/tse/inserir',
      icon: 'Package',
      badge: {
        text: 'RESTRITO',
      },
    },

  ],
  bottom: [
    
    {
      name: 'Account',
      url: '/dashboard',
      icon: 'User',
      badge: {
        variant: 'success',
        text: '3',
      },
    },
  ],
};
