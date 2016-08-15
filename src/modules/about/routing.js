'use strict';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  let states = [{
    state: 'modules.home',
    config: {
      url: '/',
      title: 'Home',
      views: {
        'content@': {
          template: '<div>about</div>',
          controller: function() {
            var vm = this;

            console.log('jeee');
          },
          controllerAs: 'vm'
        }
      }
    }
  }];

  RouterHelper.configureStates(states);

  console.log(RouterHelper.getStates());
}
