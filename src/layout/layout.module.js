'use strict';

import angular from 'angular';
import headerModule from './header/header.module';
import footerModule from './footer/footer.module';
import sidenavModule from './sidenav/sidenav.module';
import routes from './layout.routes';

export default angular
  .module('layout', [
      headerModule, footerModule, sidenavModule
  ])
  .run(routes)
  .name;
