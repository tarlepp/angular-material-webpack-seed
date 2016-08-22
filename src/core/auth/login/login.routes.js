import LoginController from './login.controller';
import UserRoles from './../constants/userRoles';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [{
    state: 'auth.login',
    config: {
      url: '/login',
      parent: 'auth',
      title: 'Login',
      data: {
        access: UserRoles.ROLE_ANON,
      },
      views: {
        'content@': {
          template: require('./login.html'),
          controller: LoginController,
          controllerAs: 'vm',
        },
      },
    },
  }];

  RouterHelper.configureStates(states);
}
