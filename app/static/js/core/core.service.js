(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .factory('CoreFactory', CoreFactory);
    
    function CoreFactory() {
        
        return {
            stringToDashLowerCase: stringToDashLowerCase
        };
        
        function stringToDashLowerCase(str) {
            return str.replace(/\s+/g, '-').toLowerCase();
        }
    }
    
})();
