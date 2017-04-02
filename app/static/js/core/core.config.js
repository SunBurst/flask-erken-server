(function() {
    'use strict';
    
    angular
        .module('app.core')
        .config(config);
    
    function config($qProvider, $interpolateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        $qProvider.errorOnUnhandledRejections(false)
        
        $interpolateProvider.startSymbol('{['); // Required in order to work with Jinja2
        $interpolateProvider.endSymbol(']}');   // Required in order to work with Jinja2
        
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        
        $urlRouterProvider.otherwise('/start');
        
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
        
    }
    
})();
