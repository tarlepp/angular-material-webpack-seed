// Imports
import angular from 'angular';
import AuthService from './auth.service';
import UserService from './user.service';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.core.auth.services', [])
  .service('AuthService', AuthService)
  .service('UserService', UserService)
  .name;
