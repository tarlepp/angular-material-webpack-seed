// Imports
import angular from 'angular';
import about from './about/about.module';
import routes from './modules.routes';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.modules', [
    about,
  ])
  .run(routes)
  .name;
