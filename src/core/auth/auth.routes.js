// Imports
import UserRoles from './constants/userRoles';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [{
    state: 'auth',
    config: {
      abstract: true,
      url: '/auth',
      parent: 'layout',
      data: {
        access: UserRoles.ROLE_ANON,
      },
    },
  }];

  RouterHelper.configureStates(states);
}
