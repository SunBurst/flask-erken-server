(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationCamsAndPhotosVideosCtrl', StationCamsAndPhotosVideosCtrl);
    
    StationCamsAndPhotosVideosCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'stationStorage', 'stationVideos'];
    
    function StationCamsAndPhotosVideosCtrl($scope, $mdDialog, $mdMedia, stationStorage, stationVideos) {
        var vm = this;
        
        vm.$onInit = onInit;
        vm.dateChange = dateChange;
        vm.getVideoUrls = getVideoUrls;
        vm.station = stationStorage.getStation();
        vm.noVideos = noVideos;
        vm.videoUrls = [];
        
        vm.datePickerModel = {
            date: moment().startOf('day')
        };

        function dateChange() {
            updateVideoUrls();     
        }
        
        function getVideoUrls() {
            var stationId = vm.station.id;
            var onDate = vm.datePickerModel.date.valueOf();
            return stationVideos.getVideoUrls(stationId, onDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function noVideos() {
            if (vm.videoUrls.length == 0) {
                return true;
            }
            return false;
            
        }
        
        function onInit() {
            updateVideoUrls();
        }
        
        function updateVideoUrls() {
            vm.getVideoUrls().then(function(data) {
                vm.videoUrls = data;
            });
        }
        
    }
    
})();
