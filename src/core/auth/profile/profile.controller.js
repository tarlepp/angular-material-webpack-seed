/**
 * @ngInject
 */
export default class ProfileController {
  constructor(UserService, _profileData) {
    this.user = UserService.getProfile();
    this.profile = _profileData.data;
  }
}
