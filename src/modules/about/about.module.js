import angular from 'angular';
import routes from './about.routes';

export default angular
  .module('modules.about', [])
  .run(routes)
  .name;
