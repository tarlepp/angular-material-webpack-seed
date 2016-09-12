// Interface for the class
import AboutItemInterface from './aboutItem.interface';

/**
 * AboutItem class.
 */
export default class AboutItem implements AboutItemInterface {
  /**
   * Constructor of the class
   *
   * @param {AboutItemInterface}  item
   */
  constructor(item) {
    this.title = item.title;
    this.url = item.url;
    this.image = item.image;
  }
}
