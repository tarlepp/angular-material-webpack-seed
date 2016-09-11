// Imports
import LoginController from './login.controller';
import UserRoles from './../constants/userRoles';
import { logout } from './login.resolve';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [
    {
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
    },
    {
      state: 'auth.logout',
      config: {
        url: '/logout',
        parent: 'auth',
        title: 'Logout',
        data: {
          access: UserRoles.ROLE_LOGGED,
        },
        views: {
          'content@': {
            resolve: {
              logout,
            },
          },
        },
      },
    },
  ];

  RouterHelper.configureStates(states);
}
