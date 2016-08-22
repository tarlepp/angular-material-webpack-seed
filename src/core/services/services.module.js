import angular from 'angular';
import HttpStatusService from './httpStatus.service';

export default angular
  .module('core.services', [])
  .service('HttpStatusService', HttpStatusService)
  .name;
