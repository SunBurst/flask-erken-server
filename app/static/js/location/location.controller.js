(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('Location', Location);
    
    Location.$inject = ['location'];
    
    function Location(location) {
        var vm = this;
        vm.location = location;
    }
    
})();
