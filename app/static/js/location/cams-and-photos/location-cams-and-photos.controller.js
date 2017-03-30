(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCamsAndPhotos', LocationCamsAndPhotos);
    
    LocationCamsAndPhotos.$inject = ['$scope', 'resolvedLiveWebcams', 'locationCamsAndPhotosStorage', 'locationStorage', 'locationWebcams'];
    
    function LocationCamsAndPhotos($scope, resolvedLiveWebcams, locationCamsAndPhotosStorage, locationStorage, locationWebcams) {
        var vm = this;

        vm.dateChange = dateChange;
        vm.getWebcamPhotos = getWebcamPhotos;
        vm.liveWebcams = resolvedLiveWebcams;
        vm.location = locationStorage.getLocation();
        vm.updateWebcamPhotos = updateWebcamPhotos;
        vm.webcamPhotos = [];
       
        vm.datePickerModel = {
            date: moment().startOf('day')
        };

        function dateChange() {
            updateWebcamPhotos();
        }
        
        function updateWebcamPhotos() {
            vm.getWebcamPhotos().then(function(data) {
                vm.wecamPhotos = data;
            });
        }
        
        function getWebcamPhotos() {
            var locationId = vm.location.location_id;
            var fromDate = vm.datePickerModel.date.valueOf();
            var dateCopy = vm.datePickerModel.date;
            var toDate = dateCopy.clone().add(1, 'days').valueOf();
            return locationWebcams.getWebcamPhotos(locationId, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }

    }
        
})();
