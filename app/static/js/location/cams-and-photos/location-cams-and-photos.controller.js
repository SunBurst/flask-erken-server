(function() {
    
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCamsAndPhotos', LocationCamsAndPhotos);
    
    LocationCamsAndPhotos.$inject = ['$scope', 'Lightbox', 'resolvedLiveWebcams', 'locationWebcams', 'locationStorage'];
    
    function LocationCamsAndPhotos($scope, Lightbox, resolvedLiveWebcams, locationWebcams, locationStorage) {
        var vm = this;

        vm.getWebcamPhotos = getWebcamPhotos;
        vm.images =  [];
        vm.liveWebcams = resolvedLiveWebcams;
        vm.location = locationStorage.getLocation();
        vm.openLightboxModal = openLightboxModal;
        vm.updateWebcamPhotos = updateWebcamPhotos;
        vm.webcamPhotos;        
       
        vm.datePickerModel = {
            datePicker: {
                date: moment().startOf('day')
            },
            datePickerOptions: {
                singleDatePicker: true
            }
        };
        
        function updateWebcamPhotos() {
            vm.getWebcamPhotos().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    vm.images.push({
                        'url': 'data:image/png;base64,' + data[i].photo,
                        'thumbUrl': 'data:image/png;base64,' + data[i].photo
                    });
                    console.log(vm.images[i]);
                }
                vm.webcamPhotos = data;
                return vm.webcamPhotos;
            });
        }
        
        function getWebcamPhotos() {
            var locationId = vm.location.location_id;
            var fromDate = vm.datePickerModel.datePicker.date.valueOf();
            var dateCopy = vm.datePickerModel.datePicker.date
            var toDate = dateCopy.clone().add(1, 'days').valueOf();
            return locationWebcams.getWebcamPhotos(locationId, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function openLightboxModal(index) {
            Lightbox.openModal(vm.images, index);
        };
        
        $scope.$watch(function() {
            return vm.datePickerModel.datePicker.date;
        }, function (newDate, oldDate) {
            vm.updateWebcamPhotos();
        });

    }
        
})();
