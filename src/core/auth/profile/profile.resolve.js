export default () => {};

/**
 * @ngInject
 * @param UserService
 * @returns {*}
 */
export function profileData(UserService) {
  return UserService
    .fetchProfile()
    .then(
      (response) => response.data
    )
  ;
}
