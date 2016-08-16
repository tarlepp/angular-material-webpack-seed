import angular from 'angular';
import LoggerService from './logger.service';

export default angular
  .module('blocks.logger', [])
  .service('LoggerService', LoggerService)
  .name;
