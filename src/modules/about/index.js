'use strict';

import angular from 'angular';
import routing from './routing';

export default angular
  .module('modules.about', [])
  .run(routing)
  .name;