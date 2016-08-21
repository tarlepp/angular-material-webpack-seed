/**
 * @ngInject
 */
export default class ExceptionHandler {
  constructor() {
    this.config = {
      appErrorPrefix: undefined,
    };
  }

  configure(appErrorPrefix) {
    this.config.appErrorPrefix = appErrorPrefix;
  }

  $get() {
    return {
      config: this.config,
    };
  }
}
