import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularLoadingBar from 'angular-loading-bar';
import angularMaterial from 'angular-material';
import angularSanitize from 'angular-sanitize';
import ngstorage from 'ngstorage';
import uiRouter from 'angular-ui-router';

export default angular
  .module('dependencies', [
    angularAnimate, angularAria, angularLoadingBar, angularMaterial, angularSanitize,
    ngstorage.name, // see https://github.com/gsklee/ngStorage/pull/159
    uiRouter
  ])
  .name;
