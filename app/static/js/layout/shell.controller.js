(function() {
    'use strict';
    
    angular
        .module('app.layout')
        .controller('Shell', Shell);
    
    Shell.$inject = ['$mdSidenav', '$timeout'];
    
    function Shell($mdSidenav, $mdMedia, $timeout) {
        var vm = this;
        vm.toggleList = toggleList;
        
        function toggleList() {
            $mdSidenav('left').toggle();
        }
        
    }
    
})();
