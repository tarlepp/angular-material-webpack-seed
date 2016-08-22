import angular from 'angular';
import UserRoles from './userRoles';

export default angular
  .module('core.auth.constants', [])
  .constant('UserRoles', UserRoles)
  .name;
