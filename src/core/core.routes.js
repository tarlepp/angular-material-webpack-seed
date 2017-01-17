/**
 * @desc  This file contains core route + state change event handling.
 * @ngInject
 *
 * @param {*}                       $rootScope
 * @param {ui.router.state.$state}  $state
 * @param {$localStorage}           $localStorage
 * @param {jwtHelper}               jwtHelper
 * @param {RouterHelper}            RouterHelper
 * @param {AuthService}             AuthService
 * @param {UserService}             UserService
 * @param {LoggerService}           LoggerService
 */
export default (
  $rootScope, $state, $localStorage,
  jwtHelper,
  RouterHelper, AuthService, UserService, LoggerService,
) => {
  const states = [{
    state: '404',
    config: {
      url: '/404',
      title: '404',
      parent: 'layout',
      views: {
        'content@': {
          template: require('./404.html'),
        },
      },
    },
  }];

  // Configure default routes + otherwise route
  RouterHelper.configureStates(states, '/404');

  let bypass;

  // Check user role for requested state + fetch new JWT if current one is expired
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState) => {
    if (bypass) {
      bypass = false;

      return;
    }

    event.preventDefault();

    const token = $localStorage.token;
    const refreshToken = $localStorage.refreshToken;

    const checkState = () => {
      bypass = true;

      // User don't have access to this state,
      if ({}.hasOwnProperty.call(toState.data || {}, 'access')
          && !AuthService.authorize(toState.data.access)
      ) {
        LoggerService.error(`You don't have access to '${toState.title}' page.`);

        return fromState.abstract ? $state.go('auth.login') : $state.reload();
      }

      return $state.go(toState, toParams);
    };

    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        checkState();
      } else {
        AuthService
          .refreshToken(refreshToken)
          .then(checkState)
          .catch(() => {
            bypass = true;

            LoggerService.success('Please login.');

            AuthService.logout(true);
          })
        ;
      }
    } else {
      checkState();
    }
  });

  // Add success handler for route change
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.containerClass = toState.containerClass;
  });

  // Watcher for user authentication status
  $rootScope.$watch('isAuthenticated', () => {
    $rootScope.user = UserService.getProfile();
  });
};
