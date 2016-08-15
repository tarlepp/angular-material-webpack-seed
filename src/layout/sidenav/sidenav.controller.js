'use strict';

/**
 * @ngInject
 */
export default class SidenavController {
  state;
  mdSidenav;

  constructor($state, $mdSidenav) {
    this.state = $state;
    this.mdSidenav = $mdSidenav;
  }

  hideSideMenu() {
    this.mdSidenav('left').close();
  }
}
