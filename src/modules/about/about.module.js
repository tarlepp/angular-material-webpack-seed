// Imports
import angular from 'angular';
import routes from './about.routes';

// CSS styles for 'about' page
import './about.scss';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.modules.about', [])
  .run(routes)
  .name;
