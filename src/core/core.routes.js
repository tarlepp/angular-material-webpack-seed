/**
 * @ngInject
 * @param $rootScope
 * @param RouterHelper
 */
export default ($rootScope, RouterHelper) => {
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

  RouterHelper.configureStates(states, '/404');

  // Add success handler for route change
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.containerClass = toState.containerClass;
  });
};
