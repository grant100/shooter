
require('angular');
require('angular-messages');
require('angular-material');
require('angular-material/angular-material.css');
require('angular-animate');
require('angular-aria');
require('@uirouter/angularjs');

var app = angular.module('app', [
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'ngMessages'
]);

// directories require and index.js ... 
require('./lobby')(app);
require('./config')(app);



