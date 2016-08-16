/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  const states = [{
    state: 'modules',
    config: {
      abstract: true,
      parent: 'layout',
    },
  }];

  RouterHelper.configureStates(states);
}
