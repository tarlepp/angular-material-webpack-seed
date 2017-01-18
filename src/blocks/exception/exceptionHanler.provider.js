/**
 * @desc  ExceptionHandler provider.
 *
 * @ngInject
 */
export default class ExceptionHandler {
  config: {
    appErrorPrefix: string
  };

  // Constructor of the class.
  constructor() {
    this.config = {
      appErrorPrefix: '',
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

  // noinspection JSUnusedGlobalSymbols
  $get() {
    return {
      config: this.config,
    };
  }
}
