import angular from 'angular';
import routes from './profile.routes';

export default angular
  .module('core.auth.profile', [])
  .run(routes)
  .name;
