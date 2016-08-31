/**
 * @ngInject
 */
export default class AboutController {
  constructor($window) {
    this.$window = $window;

    this.items = [
      {
        title: 'Angular.js',
        image: require('./img/angularjs-logo.png'),
        url: 'https://angularjs.org/',
      },
      {
        title: 'Angular Material',
        image: require('./img/angular-materia-logo.png'),
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
    ];
  }

  open(item) {
    this.$window.open(item.url, '_blank');
  }
}
