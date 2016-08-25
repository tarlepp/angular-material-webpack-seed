/**
 * @ngInject
 * @param {*}             $rootScope
 * @param {$state}        $state
 * @param {$log}          $log
 * @param {$localStorage} $localStorage
 * @param {jwtHelper}     jwtHelper
 * @param {RouterHelper}  RouterHelper
 * @param {AuthService}   AuthService
 * @param {UserService}   UserService
 */
export default (
  $rootScope, $state, $log, $localStorage,
  jwtHelper,
  RouterHelper, AuthService, UserService
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

  // Check user role for requested state
  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    if (bypass) {
      bypass = false;

      return;
    }

    event.preventDefault();

    const token = $localStorage.token;
    const refreshToken = $localStorage.refreshToken;

    const checkState = () => {
      $log.debug('checkState');

      bypass = true;

      if ({}.hasOwnProperty.call(toState.data || {}, 'access') &&
          !AuthService.authorize(toState.data.access)
      ) {
        $state.go('auth.login');
      }

      $state.go(toState, toParams);
    };

    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        $log.debug('token not expired');

        checkState();
      } else {
        $log.debug('token expired');

        AuthService
          .refreshToken(refreshToken)
          .then((response) => {
            $log.debug('got new token!', response);

            checkState();
          })
        ;
      }
    } else {
      $log.debug('no token...');

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
