/**
 * @ngInject
 */
export default function ($delegate, ExceptionHandler, LoggerService) {
  return function decorator(exception, cause) {
    const appErrorPrefix = ExceptionHandler.config.appErrorPrefix || '';
    const errorData = {
      exception,
      cause,
    };

    // Create exception message
    exception.message = appErrorPrefix + exception.message;

    $delegate(exception, cause);

    /**
     * Could add the error to a service's collection, add errors to $rootScope, log errors to remote web server,
     * or log locally. Or throw hard. It is entirely up to you. throw exception;
     *
     * @example
     *  throw { message: 'error message we added' };
     */
    LoggerService.error(exception.message, errorData);
  };
}
