/**
 * @ngInject
 */
export default class AuthService {
  /**
   * Constructor of the AuthService.
   *
   * @param {$http}         $http
   * @param {$state}        $state
   * @param {$localStorage} $localStorage
   * @param {authManager}   authManager
   * @param {UserService}   UserService
   * @param {LoggerService} LoggerService
   * @param {UserRoles}     UserRoles
   * @param {config}        config
   */
  constructor(
    $http, $state, $localStorage,
    authManager,
    UserService, LoggerService,
    UserRoles, config
  ) {
    this.$http = $http;
    this.$state = $state;
    this.$localStorage = $localStorage;
    this.authManager = authManager;
    this.userService = UserService;
    this.logger = LoggerService;
    this.roles = UserRoles;
    this.config = config;
  }

  /**
   * Method to authenticate given credentials against backend server.
   *
   * @param {object}  credentials
   * @returns {*|Promise.<TResult>}
   */
  authenticate(credentials) {
    return this.$http
      .post(`${this.config.API_URL}auth/getToken`, credentials)
      .then(
        (response) => {
          // Store JWT data
          this.$localStorage.token = response.data.token;
          this.$localStorage.refreshToken = response.data.refresh_token;

          // Store authenticate state to authManager
          this.authManager.authenticate();

          // Show successfully message to user
          this.logger.success('Logged in successfully.');

          return response;
        }
      )
    ;
  }

  /**
   * Method to check if current user has specified role or not.
   *
   * @param {string} role
   * @returns {boolean}
   */
  authorize(role) {
    // Anon routes are available for everyone
    if (role === this.roles.ROLE_ANON) {
      return true;
    } else if (this.userService.getProfile()) { // Otherwise if user is authenticated check if he/she has that role
      return this.userService.getRoles().indexOf(role) !== -1;
    }

    // And otherwise always return false - fail safe
    return false;
  }

  /**
   * Method to check if current user is authenticated or not.
   *
   * @param {boolean} suppress
   */
  isAuthenticated(suppress = true) {
    if (!this.userService.getProfile() && !suppress) {
      this.logger.error('Auth error!');
    }

    return !!this.userService.getProfile();
  }

  /**
   * Method to logout current user.
   */
  logout() {
    this.logger.success('Logged out successfully.');

    // Reset local storage + un-authenticate current user
    this.$localStorage.$reset();
    this.authManager.unauthenticate();

    // And redirect user back to login page
    this.$state.go('auth.login');
  }
}
