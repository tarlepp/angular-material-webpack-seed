// Imports
import angular from 'angular';
import UserRoles from './userRoles';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.core.auth.constants', [])
  .constant('UserRoles', UserRoles)
  .name;
