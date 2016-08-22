import angular from 'angular';
import ErrorInterceptor from './errorInterceptor.service';

export default angular
  .module('core.interceptors', [])
  .service('ErrorInterceptor', ErrorInterceptor)
  .name;
