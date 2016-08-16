import angular from 'angular';
import RouterHelper from './routerHelper.provider';

export default angular
  .module('blocks.router', [])
  .provider('RouterHelper', RouterHelper)
  .name;
