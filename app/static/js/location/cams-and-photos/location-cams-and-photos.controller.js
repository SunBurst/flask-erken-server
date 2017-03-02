(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCamsAndPhotos', LocationCamsAndPhotos);
    
    LocationCamsAndPhotos.$inject = ['resolvedLiveWebcams'];
    
    function LocationCamsAndPhotos(resolvedLiveWebcams) {
        var vm = this;
        
        vm.liveWebcams = resolvedLiveWebcams;
    }
        
})();
