import angular from 'angular';
import routes from './login.routes';

import './login.scss';

export default angular
  .module('core.auth.login', [])
  .run(routes)
  .name;
