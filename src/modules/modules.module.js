import angular from 'angular';
import about from './about/about.module';
import routes from './modules.routes';

export default angular
  .module('modules', [
    about,
  ])
  .run(routes)
  .name;
