import _ from 'lodash';

/**
 * @ngInject
 */
export default class LoggerService {
  /**
   * @param $log
   * @param $injector
   */
  constructor($log, $injector) {
    this.$log = $log;
    this.$injector = $injector;
  }

  /**
   * @param {string}  message
   * @param {object}  [data]
   * @param {string}  [title]
   */
  error(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.error(['Error:', message].join(' '), data, title);
  }

  /**
   * @param {string}  message
   * @param {object}  [data]
   * @param {string}  [title]
   */
  info(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.info(['Info:', message].join(' '), data, title);
  }

  /**
   * @param {string}  message
   * @param {object}  [data]
   * @param {string}  [title]
   */
  success(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.log(['Success:', message].join(' '), data, title);
  }

  /**
   * @param {string}  message
   * @param {object}  [data]
   * @param {string}  [title]
   */
  warning(message, data = {}, title = '') {
    this.showToast(message, data, title);
    this.$log.warn(['Warning:', message].join(' '), data, title);
  }

  /**
   * @param {*} args
   */
  log(...args) {
    this.$log.log(args);
  }

  /**
   * @param {string}  message
   * @param {object}  [data]
   * @param {string}  [title]
   */
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
