(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataSidenavCtrl', StationDataSidenavCtrl);
        
    StationDataSidenavCtrl.$inject = [
        '$mdSidenav',
    ];
        
    function StationDataSidenavCtrl($mdSidenav) {
        var vm = this;
        vm.toggleRight = toggleRight;

        function toggleRight() {
            console.log("Is open? ", $mdSidenav('left').isOpen());
            console.log("Is locked open? ", $mdSidenav('left').isLockedOpen());
            $mdSidenav('right').toggle();
        };

    }
    
})();
