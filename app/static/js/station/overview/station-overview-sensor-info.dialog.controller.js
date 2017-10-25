(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationSensorInfoDialogController', StationSensorInfoDialogController);
        
    StationSensorInfoDialogController.$inject = ['$mdDialog', 'sensor', 'StationSensorsFactory'];
    
    function StationSensorInfoDialogController($mdDialog, sensor, StationSensorsFactory) {
        var vm = this;
        
        vm.cancel = cancel;
        vm.sensor = sensor;
        vm.sensorGroups = [];
        vm.sensorParmeters = [];
        
        activate();
        
        function activate() {
            getParametersBySensor()
                .then(function(data) {
                    vm.sensorParameters = data;
                    return vm.sensorParameters;
                });
            getGroupsBySensor()
                .then(function(data) {
                    vm.sensorGroups = data;
                    return vm.sensorGroups;
                });
        }
        
        function cancel() {
            $mdDialog.cancel();
        };
        
        function getGroupsBySensor() {
            return StationSensorsFactory.getSensorGroups(vm.sensor.sensor_id)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getParametersBySensor() {
            return StationSensorsFactory.getSensorParameters(vm.sensor.sensor_id)
                .then(function(response) {
                    return response.data;
                });
        }
        
    }
    
})();
