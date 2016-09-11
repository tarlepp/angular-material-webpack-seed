/**
 * @ngInject
 */
export default class LoginController {
  /**
   * Constructor of the class.
   *
   * @param {ui.router.state.$state}  $state
   * @param {AuthService}             AuthService
   */
  constructor($state, AuthService) {
    this.$state = $state;
    this.authService = AuthService;
    this.loading = false;

    if (AuthService.isAuthenticated()) {
      this.$state.go('auth.profile');
    }

    this.reset();
  }

  // Method to make login request to specified backend.
  login() {
    this.loading = true;

    this.authService
      .authenticate(this.credentials)
      .then(() => {
        this.$state.go('auth.profile');
      })
      .catch(() => {
        this.reset();
      })
      .finally(() => {
        this.loading = false;
      })
    ;
  }

  // Method to "reset" used credentials object.
  reset() {
    this.credentials = {
      username: '',
      password: '',
    };
  }
}
