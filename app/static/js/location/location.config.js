(function() {
    
    'use strict';
    
    angular
        .module('app.location')
        .run(runBlock);
        
    runBlock.$inject = ['rootScopeBinder'];
    
    function runBlock(rootScopeBinder) {
        rootScopeBinder.initialize();
    }
    
})();
