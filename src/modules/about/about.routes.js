import AboutController from './about.controller';

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
