// Imports
import angular from 'angular';
import RouterHelper from './routerHelper.provider';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('blocks.router', [])
  .provider('RouterHelper', RouterHelper)
  .name;
