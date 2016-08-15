'use strict';

import angular from 'angular';

class LoggerService {
  constructor($log, $injector) {
    this.$log = $log;
    this.$injector = $injector;
  }

  error(message, data, title) {
    data = data || {};
    title = title || '';

    //_showToast(message, data, title);

    this.$log.error('Error: ' + message, data, title);
  }

  warning(message, data, title) {
    data = data || {};
    title = title || '';

    //_showToast(message, data, title);

    this.$log.error('Error: ' + message, data, title);
  }
}

export default angular
  .module('blocks.logger', [])
  .service('LoggerService', LoggerService)
  .name;
