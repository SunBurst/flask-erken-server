(function() {
    'use strict';
    
    angular
        .module('app.core')
        .config(config);
    
    function config($qProvider, $interpolateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        $qProvider.errorOnUnhandledRejections(false)
        
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        
        $urlRouterProvider.otherwise('/start');
        
        $mdThemingProvider.definePalette('blue', {
            '50': '015072',
            '100': '016894',
            '200': '0290CD',
            '300': '09ACF2',
            '400': '29b6f6',
            '500': '03a9f4',
            '600': '039be5',
            '700': '0288d1',
            '800': '0277bd',
            '900': '01579b',
            'A100': '80d8ff',
            'A200': '40c4ff',
            'A400': '00b0ff',
            'A700': '0091ea',
            'contrastDefaultColor': 'light',
        });
        
        $mdThemingProvider.definePalette('white', {
            '50': 'ffffff',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'ffffff',
            '600': 'ffffff',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'dark'
          });
        
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .backgroundPalette('white');
        
    }
    
})();
