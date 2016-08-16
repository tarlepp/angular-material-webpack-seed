/**
 * @ngInject
 */
export default class ExceptionFactory {
  constructor(LoggerService) {
    this.logger = LoggerService;
  }

  catcher(message) {
    return (reason) => {
      this.logger.error(message, reason);
    };
  }
}
