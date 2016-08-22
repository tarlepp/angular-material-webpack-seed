/**
 * @ngInject
 * @param {*}             $rootScope
 * @param {$state}        $state
 * @param {$log}          $log
 * @param {$localStorage} $localStorage
 * @param {RouterHelper}  RouterHelper
 * @param {AuthService}   AuthService
 * @param {UserService}   UserService
 */
export default (
  $rootScope, $state, $log, $localStorage,
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

  // Check user role for requested state
  $rootScope.$on('$stateChangeStart', (event, toState) => {
    if ({}.hasOwnProperty.call(toState.data || {}, 'access') &&
      !AuthService.authorize(toState.data.access)
    ) {
      event.preventDefault();

      $state.go('auth.login');

      $log.debug('todo implement user role check!', toState.data);
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
