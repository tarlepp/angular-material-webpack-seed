/**
 * @desc  ExceptionFactory class.
 *
 * @ngInject
 */
export default class ExceptionFactory {
  /**
   * Constructor of the class.
   *
   * @param {LoggerService} LoggerService
   */
  constructor(LoggerService) {
    this.logger = LoggerService;
  }

  /**
   * Catcher method.
   *
   * @param message
   * @returns {function(*=)}
   */
  catcher(message: string) {
    return (reason) => {
      this.logger.error(message, reason);
    };
  }
}
