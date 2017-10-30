(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationCtrl', StationCtrl);
    
    StationCtrl.$inject = ['$state', 'stationStorage'];
    
    function StationCtrl($state, stationStorage) {
        var vm = this;
        //vm.initTab = "overview";
        vm.station = stationStorage.getStation();
        //vm.selectedItem = vm.initTab;
        
        //$state.go("station." + vm.initTab);

    }
    
})();
