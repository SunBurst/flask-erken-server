(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocationDataFactory', activeLocationDataFactory);

    function activeLocationDataFactory() {

        return {
            activeLocationParametersSelection: []
        };

    }
    
})();
