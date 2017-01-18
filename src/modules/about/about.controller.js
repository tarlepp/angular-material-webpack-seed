// Imports
import AboutItem from './../../entities/aboutItem';

/**
 * @ngInject
 */
export default class AboutController {
  /**
   * Constructor of the class.
   *
   * @param {Window} $window
   */
  constructor($window) {
    this.$window = $window;

    /**
     * List of AboutItem objects which is shown on about page
     *
     * @type {AboutItem[]}
     */
    this.items = [
      {
        title: 'Angular.js',
        image: require('./img/angularjs-logo.png'),
        url: 'https://angularjs.org/',
      },
      {
        title: 'Angular Material',
        image: require('./img/angular-material-logo.png'),
        url: 'https://material.angularjs.org',
      },
      {
        title: 'Webpack',
        image: require('./img/what-is-webpack.png'),
        url: 'https://webpack.github.io/',
      },
      {
        title: 'Babel',
        image: require('./img/babel-logo.png'),
        url: 'https://babeljs.io/',
      },
      {
        title: 'Node Sass',
        image: require('./img/libsass-logo.png'),
        url: 'https://www.npmjs.com/package/node-sass',
      },
      {
        title: 'Json Web Token',
        image: require('./img/jwt-logo.jpg'),
        url: 'https://jwt.io/',
      },
    ].map(item => new AboutItem(item));
  }

  /**
   * Method to open selected item URL to new tab.
   *
   * @param {AboutItem} item
   */
  open(item: AboutItem): void {
    this.$window.open(item.url, '_blank');
  }
}
