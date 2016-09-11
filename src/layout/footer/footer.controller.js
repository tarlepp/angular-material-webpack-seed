/**
 * @ngInject
 */
export default class FooterController {
  // Constructor
  constructor(config) {
    this.version = config.VERSION;
  }
}
