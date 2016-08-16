import angular from 'angular';
import loggerService from './../blocks/logger/logger.service';
import routerProvider from './../blocks/router/routerHelper.provider';

export default angular
  .module('core', [
    loggerService,
    routerProvider,
  ])
  .name;
