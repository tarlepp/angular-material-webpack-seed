'use strict';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  let states = [{
    state: 'modules',
    config: {
      abstract: true,
      parent: 'layout'
    }
  }];

  RouterHelper.configureStates(states);
}
