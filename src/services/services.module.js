import angular from 'angular';
import MenuItemService from './menuItem.service';

export default angular
  .module('services', [])
  .service('MenuItemService', MenuItemService)
  .name;
