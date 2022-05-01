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
      name: 'Auditar BU',
      url: '/elements/auditar',
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
      url: '/elements/inserir',
      icon: 'Package',
      badge: {
        text: 'RESTRITO',
      },
    },
    {
      name: 'Todas BUs',
      url: '/elements/consultar_todos',
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
