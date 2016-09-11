// Imports
import angular from 'angular';
import headerModule from './header/header.module';
import footerModule from './footer/footer.module';
import sidenavModule from './sidenav/sidenav.module';
import routes from './layout.routes';

/**
 * @ngInject
 */
export default angular
  .module('app.layout', [
    headerModule,
    footerModule,
    sidenavModule,
  ])
  .run(routes)
  .name;
