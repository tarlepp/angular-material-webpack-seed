/**
 * @ngInject
 */
export default class FooterController {
  constructor(config) {
    this.version = config.VERSION;
  }
}
