// Imports
import angular from 'angular';
import HttpStatusService from './httpStatus.service';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.core.services', [])
  .service('HttpStatusService', HttpStatusService)
  .name;
