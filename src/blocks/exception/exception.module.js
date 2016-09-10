// Imports
import angular from 'angular';
import logger from './../logger/logger.module';
import ExceptionFactory from './exception.factory';
import ExceptionHandler from './exceptionHanler.provider';
import ExceptionHandlerDecorator from './exceptionHandler.decorator';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('blocks.exception', [
    logger,
  ])
  .factory('ExceptionFactory', ExceptionFactory)
  .provider('ExceptionHandler', ExceptionHandler)
  .config(($provide) => {
    $provide.decorator('$exceptionHandler', ExceptionHandlerDecorator);
  })
  .name;
