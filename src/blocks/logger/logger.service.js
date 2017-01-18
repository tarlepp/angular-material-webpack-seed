/**
 * @desc  LoggerService class.
 *
 * @ngInject
 */
export default class LoggerService {
  /**
   * Constructor of the class.
   *
   * @param {$log}      $log
   * @param {$injector} $injector
   */
  constructor($log, $injector) {
    this.$log = $log;
    this.$injector = $injector;
  }

  /**
   * Method to create error message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  error(message: string, data: Object = {}, title: string = '') {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    this.$log.error(['Error:', message].join(' '), data, title);
  }

  /**
   * Method to create info message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  info(message: string, data: Object = {}, title: string = '') {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    this.$log.info(['Info:', message].join(' '), data, title);
  }

  /**
   * Method to create success message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  success(message: string, data: Object = {}, title: string = '') {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    this.$log.log(['Success:', message].join(' '), data, title);
  }

  /**
   * Method to create warning message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  warning(message: string, data: Object = {}, title: string = '') {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    this.$log.warn(['Warning:', message].join(' '), data, title);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Generic logger method.
   *
   * @param {*} args
   */
  log(...args) {
    // noinspection JSUnresolvedFunction
    this.$log.log(args);
  }

  /**
   * Method to show toast.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  showToast(message: string, data: Object = {}, title: string = '') {
    // noinspection JSUnresolvedFunction
    this.$injector
      .get('$mdToast')
      .showSimple([
        title,
        message,
        (Object.keys(data).length ? data : ''),
      ].join(' '));
  }
}
