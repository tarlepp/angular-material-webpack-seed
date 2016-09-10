/**
 * @desc  ExceptionHandler provider.
 *
 * @ngInject
 */
export default class ExceptionHandler {
  // Constructor of the class.
  constructor() {
    this.config = {
      appErrorPrefix: undefined,
    };
  }

  /**
   * Configure method for the class.
   *
   * @param {string}  appErrorPrefix
   */
  configure(appErrorPrefix: string) {
    this.config.appErrorPrefix = appErrorPrefix;
  }

  $get() {
    return {
      config: this.config,
    };
  }
}
