import angular from 'angular';

// Necessary CSS files from vendors
import 'angular/angular-csp.css';
import 'angular-material/angular-material.css';
import 'mdi/css/materialdesignicons.css';

// Main SCSS file for application
import './index.scss';

// Application modules
import appConfiguration from './app.config';
import dependencies from './dependencies/dependencies.module';
import core from './core/core.module';
import layout from './layout/layout.module';
import modules from './modules/modules.module';

const app = angular.module('app', [
  dependencies,
  core,
  layout,
  modules,
]);

appConfiguration(app);

angular.bootstrap(document.documentElement, ['app']);
