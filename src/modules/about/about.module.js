import angular from 'angular';
import routes from './about.routes';

import './about.scss';

export default angular
  .module('modules.about', [])
  .run(routes)
  .name;
