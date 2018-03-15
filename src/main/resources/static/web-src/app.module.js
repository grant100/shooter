
var app = angular.module('app', [
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'ngMessages'
]);

// directories require and index.js ... 
require('./lobby/lobby.html')(app);


