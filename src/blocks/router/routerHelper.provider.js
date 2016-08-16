/**
 * @ngInject
 */
export default class RouterHelper {
  /**
   * @param $locationProvider
   * @param $stateProvider
   * @param $urlRouterProvider
   */
  constructor($locationProvider, $stateProvider, $urlRouterProvider) {
    this.$locationProvider = $locationProvider;
    this.$stateProvider = $stateProvider;
    this.$urlRouterProvider = $urlRouterProvider;

    // We want to use HTML5 mode with routing
    this.$locationProvider.html5Mode(true);

    // Default config for routerHelper
    this.config = {
      docTitle: undefined,
      resolveAlways: {},
    };
  }

  /**
   * @ngInject
   * @param $location
   * @param $rootScope
   * @param $state
   * @param LoggerService
   * @returns {{
   *    configureStates: configureStates,
   *    getStates: getStates,
   *    stateCounts: {
   *      errors: number,
   *      changes: number
   *    }
   *  }}
   */
  $get($location, $rootScope, $state, LoggerService) {
    const $urlRouterProvider = this.$urlRouterProvider;
    const $stateProvider = this.$stateProvider;
    const config = this.config;
    const stateCounts = {
      errors: 0,
      changes: 0,
    };

    // Initialize used default variables
    let handlingStateChangeError = false;
    let hasOtherwise = false;

    /**
     * @name  configureStates
     * @desc  Implementation for configureStates method.
     *
     * @param {object[]}  states
     * @param {string}    [otherwisePath]
     */
    function configureStates(states, otherwisePath) {
      // Iterate specified states, add resolves to each one and attach state to router
      states.forEach((state) => {
        // state.config.resolve = angular.extend(state.config.resolve || {});

        $stateProvider.state(state.state, state.config);
      });

      // Set otherwise path
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;

        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    /**
     * @name  getStates
     * @desc  Implementation for getStates method.
     */
    function getStates() {
      return $state.get();
    }

    // Private functions for service

    /**
     * Method to get toState destination name.
     *
     * @param   {IState|{title: string, name: string, loadedTemplateUrl: string}}  toState
     * @returns {*|string}
     * @private
     */
    function _getDestination(toState) {
      return (toState && (toState.title || toState.name || toState.loadedTemplateUrl)) || 'unknown target';
    }

    /**
     * Method to determine error message that is shown to user if router error happens.
     *
     * @param   {object}  error
     * @param   {IState}  toState
     * @returns {string}
     * @private
     */
    function _getErrorMessage(error, toState) {
      return [
        'Error routing to ',
        _getDestination(toState),
        '. ',
        (error.data || ''),
        '.<br />',
        (error.statusText || ''),
        ': ',
        (error.status || ''),
      ].join('');
    }

    /**
     * Route cancellation:
     *  1) On routing error, go to the default location (/).
     *  2) Provide an exit clause if it tries to do it twice.
     *
     * @private
     */
    function _handleRoutingErrors() {
      $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
        // Oh noes error is already activated
        if (handlingStateChangeError) {
          return;
        }

        stateCounts.errors++;
        handlingStateChangeError = true;

        // State requires authenticated user.
        if (error === 'AUTH_REQUIRED') {
          $state.go('auth.login');

          LoggerService.error('Login required');
        } else { // Otherwise show error message and redirect user to root (/)
          LoggerService.warning(_getErrorMessage(error, toState), toState);

          $location.path('/');
        }
      });
    }

    /**
     * Method that will update current document title to match with state specification.
     *
     * @private
     */
    function _updateDocumentTitle() {
      $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        stateCounts.changes++;
        handlingStateChangeError = false;

        // data bind to <title>
        $rootScope.title = [
          config.docTitle,
          (toState.title || ''),
        ].join(' ');
      });
    }

    /**
     * Service initialize method. This will activate state change error listener and updates current page title to
     * match with state.
     *
     * @private
     */
    function _init() {
      _handleRoutingErrors();
      _updateDocumentTitle();
    }

    // Specify service methods
    const service = {
      configureStates,
      getStates,
      stateCounts,
    };

    // Initialize service
    _init();

    return service;
  }
}
