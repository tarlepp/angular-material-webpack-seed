/**
 * Add all 3rd party library config stuff to this file.
 *
 * @ngInject
 *
 * @param $mdThemingProvider
 */
export default ($mdThemingProvider) => {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue')
  ;
};
