(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationCamsAndPhotosLiveWebcamsCtrl', StationCamsAndPhotosLiveWebcamsCtrl);
    
    StationCamsAndPhotosLiveWebcamsCtrl.$inject = ['stationStorage'];
    
    function StationCamsAndPhotosLiveWebcamsCtrl(stationStorage) {
        var vm = this;
        
        vm.liveWebcams = stationStorage.getLiveWebcamList();
        vm.station = stationStorage.getStation();
        vm.noLiveWebcams = noLiveWebcams;
        
        function noLiveWebcams() {
            if (vm.liveWebcams.length == 0) {
                return true;
            }
            return false;
        }
        
    }
    
})();
