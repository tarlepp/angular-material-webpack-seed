'use strict';

import angular from 'angular';
import about from './about';
import routing from './routing';

export default angular
  .module('modules', [about])
  .run(routing)
  .name;
