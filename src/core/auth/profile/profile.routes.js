import ProfileController from './profile.controller';
import UserRoles from './../constants/userRoles';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [{
    state: 'auth.profile',
    config: {
      url: '/profile',
      parent: 'auth',
      title: 'Profile',
      data: {
        access: UserRoles.ROLE_LOGGED,
      },
      views: {
        'content@': {
          template: require('./profile.html'),
          controller: ProfileController,
          controllerAs: 'vm',
          resolve: {
            _profileData: function resolve(UserService) {
              return UserService.fetchProfile();
            },
          },
        },
      },
    },
  }];

  RouterHelper.configureStates(states);
}
