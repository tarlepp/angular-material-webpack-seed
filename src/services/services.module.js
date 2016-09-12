// Imports
import angular from 'angular';
import MenuItemService from './menuItem.service';

/**
 * @desc  Module initialize.
 *
 * @ngInject
 */
export default angular
  .module('app.services', [])
  .service('MenuItemService', MenuItemService)
  .name;
