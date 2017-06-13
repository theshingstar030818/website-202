export const PAGES_MENU_CLIENT = [
  {
    path: 'pages',
    children: [
    	{
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'clients',
        data: {
          menu: {
            title: 'general.menu.clients',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
    ]
  }
];