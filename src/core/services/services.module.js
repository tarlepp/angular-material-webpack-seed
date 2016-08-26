import angular from 'angular';
import HttpStatusService from './httpStatus.service';
import MenuItemService from './menuItem.service';

export default angular
  .module('core.services', [])
  .service('HttpStatusService', HttpStatusService)
  .service('MenuItemService', MenuItemService)
  .name;
