const config = require('./../config/config.json');

/**
 * Add all 3rd party library config stuff to this file.
 *
 * @ngInject
 *
 * @param {$httpProvider}       $httpProvider
 * @param {$mdThemingProvider}  $mdThemingProvider
 * @param {jwtOptionsProvider}  jwtOptionsProvider
 */
export default ($httpProvider, $mdThemingProvider, jwtOptionsProvider) => {
  // Attach JWT interceptor
  $httpProvider.interceptors.push('jwtInterceptor');

  // Configure angular-material theme
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue')
  ;

  // Configure JWT options for tokenGetter
  jwtOptionsProvider.config({
    tokenGetter: [
      '$localStorage',
      ($localStorage) => $localStorage.token,
    ],
    whiteListedDomains: config.WHITELIST_DOMAINS,
  });
};
