'use strict';

import angular from 'angular';

class RouterHelper {
  /**
   * @ngInject
   * @param $stateProvider
   * @param $urlRouterProvider
   */
  constructor($locationProvider, $stateProvider, $urlRouterProvider) {
    this.$locationProvider = $locationProvider;
    this.$stateProvider = $stateProvider;
    this.$urlRouterProvider = $urlRouterProvider;

    // We want to use HTML5 mode with routing
    this.$locationProvider.html5Mode(true);
  }

  /**
   * @ngInject
   * @param $location
   * @param $rootScope
   * @param $state
   * @param LoggerService
   * @returns {{configureStates: Providers.RouterHelper.configureStates, getStates: Providers.RouterHelper.getStates, stateCounts: {errors: number, changes: number}}}
   */
  $get($location, $rootScope, $state, LoggerService) {
    let _this = this;

    // Initialize used default variables
    var handlingStateChangeError = false;
    var hasOtherwise = false;
    var stateCounts = {
      errors: 0,
      changes: 0
    };

    // Specify service methods
    var service = {
      configureStates: configureStates,
      getStates: getStates,
      stateCounts: stateCounts
    };

    // Initialize service
    _init();

    return service;

    //////////

    /**
     * @name      configureStates
     * @desc      Implementation for configureStates method.
     * @memberOf  Providers.RouterHelper
     *
     * @param {object[]}  states
     * @param {string}    [otherwisePath]
     */
    function configureStates(states, otherwisePath) {
      // Iterate specified states, add resolves to each one and attach state to router
      states.forEach(stateIterator);

      // Set otherwise path
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;

        _this.$urlRouterProvider.otherwise(otherwisePath);
      }

      /**
       * State iterator helper function.
       *
       * @param {*}  state
       */
      function stateIterator(state) {
        state.config.resolve = angular.extend(state.config.resolve || {});

        _this.$stateProvider.state(state.state, state.config);
      }
    }

    /**
     * @name      getStates
     * @desc      Implementation for getStates method.
     * @memberOf  Providers.RouterHelper
     */
    function getStates() {
      return $state.get();
    }

    ////////// Private functions for service

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

    /**
     * Route cancellation:
     *  1) On routing error, go to the default location (/).
     *  2) Provide an exit clause if it tries to do it twice.
     *
     * @private
     */
    function _handleRoutingErrors() {
      $rootScope.$on('$stateChangeError', onEvent);

      //noinspection JSUnusedLocalSymbols

      /**
       * Callback for $stateChangeError event.
       *
       * @param {object}        event
       * @param {IState}        toState
       * @param {object}        toParams
       * @param {IState}        fromState
       * @param {object}        fromParams
       * @param {Error|string}  error
       */
      function onEvent(event, toState, toParams, fromState, fromParams, error) {
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
          var message = _getErrorMessage(error, toState);

          LoggerService.warning(message, toState);

          $location.path('/');
        }
      }
    }

    /**
     * Method that will update current document title to match with state specification.
     *
     * @private
     */
    function _updateDocumentTitle() {
      $rootScope.$on('$stateChangeSuccess', onEvent);

      //noinspection JSUnusedLocalSymbols

      /**
       * Callback for $stateChangeSuccess event.
       *
       * @param {object}                  event
       * @param {IState|{title: string}}  toState
       * @param {object}                  toParams
       * @param {IState}                  fromState
       * @param {object}                  fromParams
       * @param {Error}                   error
       */
      function onEvent(event, toState, toParams, fromState, fromParams, error) {
        stateCounts.changes++;
        handlingStateChangeError = false;

        // data bind to <title>
        //$rootScope.title = config.docTitle + ' ' + (toState.title || '');
      }
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
      var destination = _getDestination(toState);

      return 'Error routing to ' + destination + '. ' +
          (error.data || '') + '. <br />' + (error.statusText || '') +
          ': ' + (error.status || '')
          ;
    }

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
  }
}

export default angular
  .module('blocks.router', [])
  .provider('RouterHelper', RouterHelper)
  .name;
