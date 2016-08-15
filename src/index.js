'use strict';

import angular from 'angular';

import 'angular/angular-csp.css';
import 'angular-material/angular-material.css';
import './index.scss';

import demoModule from './demo/demoModule';
import dependencies from './dependencies';
import core from './core';
import layoutModule from './layout/layout.module';
import modules from './modules';

angular.module('app', [
  dependencies,
  core,
  layoutModule,
  modules,
  demoModule,
]);

angular.bootstrap(document.documentElement, ['app']);
