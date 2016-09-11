// Imports
import angular from 'angular';
import ErrorInterceptor from './errorInterceptor.service';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.core.interceptors', [])
  .service('ErrorInterceptor', ErrorInterceptor)
  .name;
