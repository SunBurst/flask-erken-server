(function() {    
    'use-strict';
    
    angular
        .module('app.core')
        .factory('rootScopeBinder', rootScopeBinder);
        
    rootScopeBinder.$inject = ['$rootScope', '$state', '$stateParams'];
        
    function rootScopeBinder($rootScope, $state, $stateParams) {
        
        return {
            initialize: initialize
        };
        
        function initialize() {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    }
        
})();
