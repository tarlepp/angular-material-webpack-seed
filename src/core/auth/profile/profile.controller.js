/**
 * @ngInject
 */
export default class ProfileController {
  /**
   * Constructor of the class.
   *
   * @param {UserService} UserService
   * @param {Object}      _profileData
   */
  constructor(UserService, _profileData) {
    this.user = UserService.getProfile();
    this.profile = _profileData;
  }
}
