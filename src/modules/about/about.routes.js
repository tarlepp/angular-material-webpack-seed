// Imports
import AboutController from './about.controller';
import UserRoles from './../../core/auth/constants/userRoles';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [{
    state: 'modules.about',
    config: {
      url: '/',
      title: 'About',
      data: {
        access: UserRoles.ROLE_ANON,
      },
      views: {
        'content@': {
          template: require('./about.html'),
          controller: AboutController,
          controllerAs: 'vm',
        },
      },
    },
  }];

  RouterHelper.configureStates(states);
}
