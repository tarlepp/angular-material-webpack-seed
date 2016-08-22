import angular from 'angular';
import exception from './../blocks/exception/exception.module';
import logger from './../blocks/logger/logger.module';
import router from './../blocks/router/router.module';
import interceptors from './interceptors/interceptors.module';
import services from './services/services.module';
import config from './core.config';
import routes from './core.routes';

export default angular
  .module('core', [
    exception,
    logger,
    router,
    interceptors,
    services,
  ])
  .config(config)
  .run(routes)
  .name;
