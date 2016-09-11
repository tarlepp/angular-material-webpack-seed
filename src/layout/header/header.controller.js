/**
 * @ngInject
 */
export default class HeaderController {
  /**
   * Constructor of the class
   *
   * @param {ui.router.state.$state}  $state
   * @param {$mdSidenav}              $mdSidenav
   * @param {AuthService}             AuthService
   */
  constructor($state, $mdSidenav, AuthService) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.authService = AuthService;
  }

  /**
   * Method to logout current user.
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Method to toggle main side navigation component.
   */
  toggleSidenav() {
    this.$mdSidenav('left').toggle();
  }
}
