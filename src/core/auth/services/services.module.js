import angular from 'angular';
import AuthService from './auth.service';
import UserService from './user.service';

export default angular
  .module('core.auth.services', [])
  .service('AuthService', AuthService)
  .service('UserService', UserService)
  .name;
