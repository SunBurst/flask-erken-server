(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataCtrl', StationDataCtrl);
        
    StationDataCtrl.$inject = ['$state'];
        
    function StationDataCtrl($state) {
        var vm = this;
        
        //activate();
        
        //function activate() {
        //    if ($state.current.name === 'station.data') {
        //        $state.go('station.data.parameters');
        //    }
        //}
        
    }
        
})();
