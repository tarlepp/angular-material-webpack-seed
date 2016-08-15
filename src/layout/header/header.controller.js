'use strict';

/**
 * @ngInject
 */
export default class HeaderController {
  state;
  mdSidenav;

  constructor($state, $mdSidenav) {
    this.state = $state;
    this.mdSidenav = $mdSidenav;
  }

  profile($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.state.go('auth.profile');
  }

  toggleSidenav() {
    this.mdSidenav('left').toggle();
  }
}
