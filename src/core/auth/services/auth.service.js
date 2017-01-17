/**
 * @ngInject
 */
export default class AuthService {
  /**
   * Constructor of the AuthService.
   *
   * @param {$http}                   $http
   * @param {ui.router.state.$state}  $state
   * @param {$localStorage}           $localStorage
   * @param {authManager}             authManager
   * @param {UserService}             UserService
   * @param {LoggerService}           LoggerService
   * @param {UserRoles}               UserRoles
   * @param {config}                  config
   */
  constructor(
    $http, $state, $localStorage,
    authManager,
    UserService, LoggerService,
    UserRoles, config,
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
   * @param {Object}  credentials
   * @returns {*|Promise.<TResult>}
   */
  authenticate(credentials: Object) {
    return this.$http
      .post(`${this.config.API_URL}auth/getToken`, credentials)
      .then(
        (response) => {
          this.storeTokenData(response.data);

          // Show successfully message to user
          this.logger.success('Logged in successfully.');

          return response;
        },
      )
    ;
  }

  /**
   * Method to refresh expired JWT token.
   *
   * @param {string} refreshToken
   * @returns {*|Promise.<TResult>}
   */
  refreshToken(refreshToken: string) {
    return this.$http
      .post(
        `${this.config.API_URL}auth/refreshToken`,
        { refresh_token: refreshToken },
        { skipAuthorization: true, skipErrorMessage: true },
      )
      .then(
        (response) => {
          this.storeTokenData(response.data, true);

          return response;
        },
      )
    ;
  }

  /**
   * Method to store token data to local storage.
   *
   * @param {Object}  data
   * @param {boolean} [skipRefreshToken]
   */
  storeTokenData(data: Object, skipRefreshToken: boolean = false) {
    // Store JWT data
    this.$localStorage.token = data.token;

    if (!skipRefreshToken) {
      this.$localStorage.refreshToken = data.refresh_token;
    }

    // Store authenticate state to authManager
    this.authManager.authenticate();
  }

  /**
   * Method to check if current user has specified role or not.
   *
   * @param {string} role
   * @returns {boolean}
   */
  authorize(role: string) {
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
   * @param {boolean} [suppress]
   */
  isAuthenticated(suppress: boolean = true) {
    if (!this.userService.getProfile() && !suppress) {
      this.logger.error('Auth error!');
    }

    return !!this.userService.getProfile();
  }

  /**
   * Method to logout current user.
   *
   * @param {boolean} [suppress]
   * @returns {*|Promise.<TResult>}
   */
  logout(suppress: boolean = false) {
    if (!suppress) {
      this.logger.success('Logged out successfully.');
    }

    // Reset local storage + un-authenticate current user
    this.$localStorage.$reset();
    this.authManager.unauthenticate();

    // And redirect user back to login page
    return this.$state.go('auth.login');
  }
}
