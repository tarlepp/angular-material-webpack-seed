import angular from 'angular';
import routes from './auth.routes';
import constants from './constants/constants.module';
import login from './login/login.module';
import profile from './profile/profile.module';
import services from './services/services.module';

export default angular
  .module('core.auth', [
    constants,
    login,
    profile,
    services,
  ])
  .run(routes)
  .name;
