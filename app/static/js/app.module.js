(function() {
    
    'use strict';
    
    angular
        .module('app', [
            'app.core',
            'app.layout',
            //'app.locations',
            'app.services',
            'app.start',
            'ui.router',
            'ngResource',
            'highcharts-ng',
            'datatables', 
            'daterangepicker',
            'uiGmapgoogle-maps'
        ]);

})();
