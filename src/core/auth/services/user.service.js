/**
 * @ngInject
 */
export default class UserService {
  /**
   * Constructor of the class.
   *
   * @param {$rootScope}    $rootScope
   * @param {$http}         $http
   * @param {$localStorage} $localStorage
   * @param {jwtHelper}     jwtHelper
   * @param {config}        config
   */
  constructor(
    $rootScope, $http, $localStorage,
    jwtHelper,
    config,
  ) {
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$localStorage = $localStorage;
    this.jwtHelper = jwtHelper;
    this.config = config;
  }

  /**
   * Method returns user profile data from Json Web Token or boolean false, if user isn't authenticated at all.
   *
   * @returns {boolean|object}
   */
  getProfile() {
    return this.$rootScope.isAuthenticated ? this.jwtHelper.decodeToken(this.$localStorage.token) : false;
  }

  /**
   * Getter method for current user roles. If user isn't authenticated method returns empty array.
   *
   * @returns {string[]}
   */
  getRoles() {
    return this.getProfile() ? this.getProfile().roles : [];
  }

  /**
   * Method to fetch user profile data from backend server.
   *
   * @returns {HttpPromise}
   */
  fetchProfile() {
    return this.$http.get(`${this.config.API_URL}auth/profile`);
  }
}
