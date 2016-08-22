import angular from 'angular';

/**
 * @ngInject
 *
 * @param {$provide}          $provide
 * @param {$httpProvider}     $httpProvider
 * @param {$logProvider}      $logProvider
 * @param {RouterHelper}      RouterHelperProvider
 * @param {ExceptionHandler}  ExceptionHandlerProvider
 */
export default ($provide, $httpProvider, $logProvider, RouterHelperProvider, ExceptionHandlerProvider) => {
  /**
   * $log decorator function, this is needed to add filename and line number to each $log command.
   *
   * @param   {function}  func
   * @returns {function}
   */
  function logDecorator(func) {
    return function anon(...input) {
      const args = [].slice.call(input);

      // Insert a separator between the existing log message(s) and what we're adding.
      args.push(' - ');

      // Use (instance of Error)'s stack to get the current line.
      let stack = (new Error()).stack.split('\n').slice(1);

      // Throw away the first item because it is the `$log.fn()` function,
      // but we want the code that called `$log.fn()`.
      stack.shift();

      // We only want the top line, thanks.
      stack = stack.slice(1, 2);

      // Put it on the args stack.
      args.push(stack);

      // Call the original function with the new args.
      func.apply(func, args);
    };
  }

  // Add filename + line number feature to $log component
  $provide.decorator('$log', ($delegate) => {
    const originalFunctions = {};

    // Store the original log functions
    angular.forEach($delegate, (originalFunction, functionName) => {
      originalFunctions[functionName] = originalFunction;
    });

    const functionsToDecorate = ['log', 'info', 'warn', 'error', 'debug'];

    // Apply the decorations
    angular.forEach(functionsToDecorate, (functionName) => {
      $delegate[functionName] = logDecorator(originalFunctions[functionName]);
    });

    return $delegate;
  });

  // Attach needed interceptors
  $httpProvider.interceptors.push('ErrorInterceptor');

  if ($logProvider.debugEnabled) {
    $logProvider.debugEnabled(true);
  }

  const config = {
    APP_TITLE: 'angular-material-webpack-seed',
    APP_ERROR_PREFIX: 'angular-material-webpack-seed - Error',
  };

  // Configure router helper provider
  RouterHelperProvider.configure({ docTitle: [config.APP_TITLE, ': '].join('') });

  // Configure exception handler provider
  ExceptionHandlerProvider.configure(config.APP_ERROR_PREFIX);
};
