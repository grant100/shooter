module.exports = function (ngModule) {

    ngModule.config(['$stateProvider', '$urlServiceProvider','$httpProvider',
        function ($stateProvider, $urlServiceProvider,  $httpProvider) {
            $urlServiceProvider.rules.otherwise({ state: 'lobby' });

            $stateProvider
                .state('lobby', {
                    url: '/',
                    component: 'lobby'
                });
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }

            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';

        }]);
};
