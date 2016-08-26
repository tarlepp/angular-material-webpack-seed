import _ from 'lodash';

/**
 * @ngInject
 */
export default class MenuItemService {
  /**
   * Constructor of the class.
   *
   * @param {$state}      $state
   * @param {$mdSidenav}  $mdSidenav
   * @param {AuthService} AuthService
   * @param {UserService} UserService
   * @param {UserRoles}   UserRoles
   */
  constructor(
    $state, $mdSidenav,
    AuthService, UserService, UserRoles
  ) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.authService = AuthService;
    this.userService = UserService;
    this.userRoles = UserRoles;

    // Actual menu items
    this.items = [
      {
        title: 'About',
        state: 'modules.about',
        access: this.userRoles.ROLE_ANON,
      },
      {
        title: 'Profile',
        state: 'auth.profile',
        access: this.userRoles.ROLE_LOGGED,
      },
      {
        title: 'Login',
        state: 'auth.login',
        access: this.userRoles.ROLE_ANON,
        logged: false,
      },
      {
        title: 'Logout',
        state: 'auth.logout',
        access: this.userRoles.ROLE_LOGGED,
      },
    ];
  }

  /**
   * Getter method for all menu items.
   *
   * @returns {object[]}
   */
  getItems() {
    const iterator = (item) => {
      if ({}.hasOwnProperty.call(item, 'items')) {
        item.items = _.filter(item.items, iterator);

        if (item.items.length === 0) {
          return false;
        }
      }

      if ({}.hasOwnProperty.call(item, 'logged')
        && !item.logged
      ) {
        return !this.userService.getProfile();
      }

      return this.authService.authorize(item.access);
    };

    return _.filter(this.items, iterator);
  }

  /**
   * Method to change application state to another one.
   *
   * @param {object}  item
   * @param {object}  [params]
   */
  goToPage(item, params = {}) {
    let parameters = {};

    if (_.isEmpty(params)
      && {}.hasOwnProperty.call(item, 'params')
      && !_.isEmpty(item.params)
    ) {
      parameters = item.params;
    }

    this.$mdSidenav('left').close();

    return this.$state.go(item.state, parameters);
  }
}
