// Imports
import MenuItemInterface from './menuItem.interface';

/**
 * MenuItem class.
 *
 * @ngInject
 */
export default class MenuItem implements MenuItemInterface {
  /**
   * Constructor of the class
   *
   * @param {MenuItemInterface}  item
   */
  constructor(item: Object) {
    this.title = item.title;
    this.state = item.state;
    this.access = item.access;
    this.hideLogged = !!item.hideLogged;
    this.params = item.params || {};
    this.items = (item.items || []).map(subItem => new MenuItem(subItem));
    this.open = !!item.open;
  }
}
