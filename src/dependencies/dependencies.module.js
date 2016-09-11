// Imports
import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularJWT from 'angular-jwt';
import angularLoadingBar from 'angular-loading-bar';
import angularMaterial from 'angular-material';
import angularSanitize from 'angular-sanitize';
import ngstorage from 'ngstorage';
import uiRouter from 'angular-ui-router';

import config from './dependencies.config';

/**
 * @ngInject
 */
export default angular
  .module('app.dependencies', [
    angularAnimate, angularAria, angularJWT, angularLoadingBar, angularMaterial, angularSanitize,
    ngstorage.name, // see https://github.com/gsklee/ngStorage/pull/159
    uiRouter,
  ])
  .config(config)
  .run((authManager) => {
    authManager.checkAuthOnRefresh();
  })
  .name;
