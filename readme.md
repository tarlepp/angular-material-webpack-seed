# Modern app seed for legacy Angular apps (1.x) 

[![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE)
[![GitHub version](https://badge.fury.io/gh/tarlepp%2Fangular-material-webpack-seed.svg)](https://badge.fury.io/gh/tarlepp%2Fangular-material-webpack-seed)
[![Dependency Status](https://david-dm.org/tarlepp/angular-material-webpack-seed.svg)](https://david-dm.org/tarlepp/angular-material-webpack-seed)
[![devDependency Status](https://david-dm.org/tarlepp/angular-material-webpack-seed/dev-status.svg)](https://david-dm.org/tarlepp/angular-material-webpack-seed#info=devDependencies)

Table of Contents
=================
  * [Modern app seed for legacy Angular apps (1.x)](#modern-app-seed-for-legacy-angular-apps-1x)
  * [Table of Contents](#table-of-contents)
  * [What is this](#what-is-this)
    * [Includes following](#includes-following)
    * [Application specified stuff](#application-specified-stuff)
  * [Installation, configure and usage](#installation-configure-and-usage)
    * [Preconditions](#preconditions)
    * [Installation](#installation)
    * [Configuration](#configuration)
    * [Usage](#usage)
  * [Getting started](#getting-started)
  * [Usage advice](#usage-advice)
    * [Directory layout](#directory-layout)
    * [Backend](#backend)
      * [Endpoints / actions:](#endpoints--actions)
      * [JWT handling](#jwt-handling)
      * [CORS support](#cors-support)
      * [Example backend](#example-backend)
    * [Angular specific conventions](#angular-specific-conventions)
    * [Directives](#directives)
  * [Author](#author)
  * [License](#license)

---

# What is this
Modern seed for "legacy" Angular (1.x) applications. With seed this you can use [ES2015](https://babeljs.io/docs/learn-es2015/) to write your frontend application.

## Includes following
* [webpack](http://webpack.github.io) (modules, assets bundling)
* [babel](http://babeljs.io) (ES2015 support)
* [ng-annotate](https://github.com/olov/ng-annotate)
* [UI-Router](https://ui-router.github.io)
* [Angular Material](https://material.angularjs.org)
* [angular-jwt](https://github.com/auth0/angular-jwt)
* karma test runner configuration

## Application specified stuff
* Blocks; Exception handling, Logger, Router
* Auth; Login, Authorization, User roles with routes 
* Common; HTTP error interceptor, 

---

# Installation, configure and usage
## Preconditions
First of all you have to install `npm` and `node.js` to your box - note that `NodeJS 6+` is required. See following links to help you with installation:
* [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)
* [Node Version Manager](https://github.com/creationix/nvm#installation)

## Installation
Open your shell/terminal and navigate to root of application folder and run following command:
```bash
npm install
```

## Configuration
Copy ```[./src/config/config.json_example](./src/config/config.json_example)``` file to ```./src/config/config.json``` and make necessary changes to it. 

## Usage
Application contains following commands that you can use
* `npm run dev-server` => starts dev servers, open [http://localhost:3000](http://localhost:3000)
* `npm run lint` => Lint your code under `.src` folder
* `npm run test` => Run unit tests
* `npm run build` => create build for production deployment, output will be generated to `dist` folder
* `npm run build-dev` => create build for development deployment, output will be generated to `public` folder

---

# Getting started
* [Angular Guide](https://docs.angularjs.org/guide)
* [Angular Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
* [Angular 1.x styleguide (ES2015)](https://github.com/toddmotto/angular-styleguide)
* [Tutorial from BabelJS](http://babeljs.io/docs/learn-es2015/)
* [Exploring ES6: Upgrade to the next version of JavaScript by Dr. Axel Rauschmayer](http://exploringjs.com/)
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [webpack documentation](http://webpack.github.io/docs/) 

---

# Usage advice 

## Directory layout
    ├── build                               # build stats
    ├── public                              # public folder (webroot for dev server)
    │   ├── _assets                         # build results - assets packed by webpack
    │   └── index.html                      # one of app entry points, for dev server
    └── src                                 # app sources
        ├── blocks                          # generic helpers
        │   ├── exception                   # exception handler
        │   ├── logger                      # logger
        │   └── router                      # router helper
        ├── core                            # application core module
        │   ├── auth                        # core.auth module, contains all authentication / authorization related stuff
        │   ├── interceptors                # core.interceptors module, contains core interceptors
        │   ├── services                    # core.services module, contains core services
        │   ├── 404.html                    # not found page template
        │   ├── core.config.js              # core module configuration
        │   ├── core.module.js              # core module initialize
        │   └── core.routes.js              # core route definitions
        ├── dependencies                    # application dependencies module
        │   ├── dependencies.config.js      # module configuration, configure 3rd party libraries here
        │   └── dependencies.module.js      # module initialize, specify 3rd party libraries here 
        ├── layout                          # layout module for application
        │   ├── footer                      # footer module
        │   ├── header                      # header module
        │   └── sidenav                     # sidenav module
        ├── modules                         # Application modules, this is where you put your own modules
        │   └── about                       # Example about module
        ├── app.config.js                   # configuration for application, contains API URL and VERSION information
        ├── index.js                        # app entry module
        ├── index.scss                      # entry point for appliction SCSS rules 
        └── index.test.js                   # entry point for test karma
     
## Backend
This application relies that your backend implements following functionality.

### Endpoints / actions:
1) POST _your_backend_url/auth/getToken
 * Request payload ```{"username": "some_username", "password": "some_password"}```
 * Response ```{"token": "JWT hash", "refresh_token": "Refresh token hash"}```
2) GET _your_backend_url/auth/profile

### JWT handling
Your backend must support JWT on authenticate and authorization. After successfully login each request will contain ```Authorization: Bearer JsonWebTokenHere``` header which your backend much validate.

Also note that actual JsonWebToken must contain ```roles``` attribute which is an array that contains user roles. These roles must match with [userRoles.js](./src/core/auth/constants/userRoles.js) definitions.

Example of decoded JsonWebToken:
```json
{
  "exp": 1474307796,
  "username": "admin",
  "ip": "xxx.xxx.xxx.xxx",
  "agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.113 Safari/537.36",
  "checksum": "8939095afa51a37861b8e0fb4812d3ad893af2aec7604a25e29afe836e588678640ebaa6e001062274b2d2a97f20528771a43b0022e37eaebdefb7d0caa28d5c",
  "roles": [
    "ROLE_ROOT",
    "ROLE_ADMIN",
    "ROLE_USER",
    "ROLE_LOGGED"
  ],
  "firstname": "Arnold",
  "surname": "Administrator",
  "email": "arnold@administrator.com",
  "iat": "1474221396"
}
```

### CORS support
Your backend should have CORS enabled if you're going to host back- and frontend in different domains.

### Example backend
You can find simple backend solution [here](https://github.com/tarlepp/symfony-backend) which implements all required for this frontend application.

## Angular specific conventions

Application organisation rules:

1. Split app into angular "modules" 
 * every module should have own folder, and should be defined in one file which will require all module components and will export module name 
 * module can have nested modules
 * module can require other modules which are direct siblings of it or parent modules, or modules nested in it (if you need to require module that is nested in "sibling" - you you should move it up by hierarchy before requiring it)
2. Keep modules small - if module is too big, maybe it should be few modules 
3. Every file should have only one entity inside it, for example if there is directive which has controller and template - there should be three files, plus likely two for unit tests
4. Group related resources by folders
5. Name files with suffixes `.directive`, `.controller`, `.component`, `.factory`, `.service`, `.provider`, etc.
6. Use `.test` suffix for test file names

## Directives

1. Prefer to use isolated scopes
2. Use controllerAs syntax 
3. Controller should act as ViewModel, use $scope only if you need it
4. All model layer (data fetching, business logic) should be in services

# Author
Tarmo Leppänen

# License
[The MIT License (MIT)](LICENSE)

Copyright (c) 2016 Tarmo Leppänen