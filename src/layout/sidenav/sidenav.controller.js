export default class SidenavController {
  /**
   * @ngInject
   * @param $state
   * @param $mdSidenav
   */
  constructor($state, $mdSidenav) {
    this.state = $state;
    this.mdSidenav = $mdSidenav;
  }

  hideSideMenu() {
    this.mdSidenav('left').close();
  }
}
