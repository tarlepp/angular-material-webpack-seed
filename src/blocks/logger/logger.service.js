import angular from 'angular';
import _ from 'lodash';

class LoggerService {
  /**
   * @ngInject
   * @param $log
   * @param $injector
   */
  constructor($log, $injector) {
    this.$log = $log;
    this.$injector = $injector;
  }

  error(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.error(['Error:', message].join(' '), data, title);
  }

  info(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.info(['Info:', message].join(' '), data, title);
  }

  success(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.info(['Success:', message].join(' '), data, title);
  }

  warning(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.warn(['Warning:', message].join(' '), data, title);
  }

  log(...args) {
    this.$log.log(args);
  }

  showToast(message, data = {}, title = '') {
    this.$injector
      .get('$mdToast')
      .showSimple([
        title,
        message,
        (!_.isEmpty(data) ? data : ''),
      ].join(' '));
  }
}

export default angular
  .module('blocks.logger', [])
  .service('LoggerService', LoggerService)
  .name;
