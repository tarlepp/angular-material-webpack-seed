/**
 * @ngInject
 */
export default class SidenavController {
  /**
   * Constructor of the class.
   *
   * @param {$scope}                  $scope
   * @param {ui.router.state.$state}  $state
   * @param {$mdSidenav}              $mdSidenav
   * @param {MenuItemService}         MenuItemService
   */
  constructor(
    $scope, $state, $mdSidenav,
    MenuItemService,
  ) {
    this.$mdSidenav = $mdSidenav;
    this.menuItemService = MenuItemService;

    // Attach includes function to controller
    this.isActive = $state.includes;

    // For now we need a watcher for actual menu items - note that is $rootScope variable
    $scope.$watch('isAuthenticated', () => {
      this.items = this.menuItemService.getItems();
    });
  }

  // Method to hide left side navigation bar.
  hideSideMenu() {
    this.$mdSidenav('left').close();
  }
}
