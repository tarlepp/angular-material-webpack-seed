/**
 * @ngInject
 */
export default class ErrorInterceptor {
  /**
   * Constructor of the class.
   *
   * @param {$q}        $q
   * @param {$injector} $injector
   */
  constructor($q, $injector) {
    this.$q = $q;
    this.$injector = $injector;
  }

  responseError = (response) => {
    const skipErrorMessage = !response.config.skipErrorMessage;

    let message = '';
    let subTitle = '';

    if (response.data && response.data.error) {
      message = response.data.error;
    } else if (response.data && response.data.message) {
      message = response.data.message;
    } else if (typeof response.data === 'string') {
      message = response.data;
    } else if (response.statusText) {
      message = response.statusText;
    } else if (response.status === 0) {
      message = `CORS error with url '${response.config.url}'`;
    } else {
      message = this.$injector.get('HttpStatusService').getStatusCodeText(response.status);
    }

    if (response.status !== 0) {
      subTitle = ['HTTP status', response.status].join(' ');
    }

    if (message && skipErrorMessage) {
      this.$injector
        .get('LoggerService')
        .error(message, response, subTitle);
    }

    return this.$q.reject(response);
  }
}
