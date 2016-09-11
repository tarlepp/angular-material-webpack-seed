// Imports
import angular from 'angular';
import routes from './login.routes';

// CSS styles for login
import './login.scss';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.core.auth.login', [])
  .run(routes)
  .name;
