// Imports
import HeaderController from './header/header.controller';
import FooterController from './footer/footer.controller';
import SidenavController from './sidenav/sidenav.controller';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [{
    state: 'layout',
    config: {
      abstract: true,
      views: {
        sidenav: {
          template: require('./sidenav/sidenav.html'),
          controller: SidenavController,
          controllerAs: 'vm',
        },
        header: {
          template: require('./header/header.html'),
          controller: HeaderController,
          controllerAs: 'vm',
        },
        footer: {
          template: require('./footer/footer.html'),
          controller: FooterController,
          controllerAs: 'vm',
        },
      },
    },
  }];

  RouterHelper.configureStates(states);
}
