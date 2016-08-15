'use strict';

import angular from 'angular';
import logger from './../blocks/logger/loggerService';
import router from './../blocks/router/routerHelper';

export default angular
  .module('core', [
    logger, router
  ])
  .name;
