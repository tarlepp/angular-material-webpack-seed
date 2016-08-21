import angular from 'angular';
import exception from './../blocks/exception/exception.module';
import logger from './../blocks/logger/logger.module';
import router from './../blocks/router/router.module';
import config from './core.config';

export default angular
  .module('core', [
    exception,
    logger,
    router,
  ])
  .config(config)
  .name;
