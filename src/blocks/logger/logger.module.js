// Imports
import angular from 'angular';
import LoggerService from './logger.service';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('blocks.logger', [])
  .service('LoggerService', LoggerService)
  .name;
