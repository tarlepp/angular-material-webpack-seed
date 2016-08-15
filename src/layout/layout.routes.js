'use strict';

import HeaderController from './header/header.controller';

/**
 * @ngInject
 * @param RouterHelper
 */
export default function routing(RouterHelper) {
  let states = [{
    state: 'layout',
    config: {
      abstract: true,
      views: {
        sidenav: {
          template: '<div>sidenav</div>',
          controller: function() {
            var vm = this;

            console.log('jeee');
          },
          controllerAs: 'vm'
        },
        header: {
          template: require('./header/header.html'),
          controller: HeaderController,
          controllerAs: 'vm'
        },
        footer: {
          template: '<div>footer</div>',
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
}
