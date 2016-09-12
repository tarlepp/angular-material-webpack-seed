export default () => {};

/**
 * @ngInject
 * @param {UserService} UserService
 * @returns {Promise.<TResult>|*}
 */
export function profileData(UserService) {
  return UserService
    .fetchProfile()
    .then(response => response.data)
  ;
}
