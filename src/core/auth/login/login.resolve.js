export default () => {};

/**
 * @ngInject
 * @param {AuthService} AuthService
 * @returns {Promise.<TResult>|*}
 */
export function logout(AuthService) {
  return AuthService.logout();
}
