import angular from 'angular';
import logger from './../logger/logger.module';
import ExceptionFactory from './exception.factory';
import ExceptionHandlerProvider from './exceptionHanler.provider';
import ExceptionHandlerDecorator from './exceptionHandler.decorator';

/**
 * @ngInject
 */
export default angular
  .module('blocks.exception', [
    logger
  ])
  .factory('ExceptionFactory', ExceptionFactory)
  .provider('ExceptionHandlerProvider', ExceptionHandlerProvider)
  .config(($provide) => {
    $provide.decorator('$exceptionHandler', ExceptionHandlerDecorator);
  })
  .name;
