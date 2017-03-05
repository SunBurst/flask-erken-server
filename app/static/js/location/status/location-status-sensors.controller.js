(function() {
    
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationStatusSensors', LocationStatusSensors);
        
    LocationStatusSensors.$inject = [
        '$filter',
        '$scope',        
        'DTOptionsBuilder', 
        'DTColumnBuilder',
        'locationMeasurements',
        'locationStorage',
        'locationStatus'
    ];
    
    function LocationStatusSensors($filter, $scope, DTOptionsBuilder, DTColumnBuilder, locationMeasurements, locationStorage, locationStatus) {
        var vm = this;
        
        vm.getSensorsStatus = getSensorsStatus;
        vm.initSensorsStatusTable = initSensorsStatusTable;
        vm.location = locationStorage.getLocation();
        vm.sensorStatusTable = {
            dtOptions: null,
            dtColumns: null
        };
        
        vm.initSensorsStatusTable();

        function getSensorsStatus() {
            var locationId = vm.location.location_id;
            return locationStatus.getSensorsStatus(locationId)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initSensorsStatusTable() {
            vm.sensorStatusTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getSensorsStatus();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.sensorStatusTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('Location ID').notVisible(),
                DTColumnBuilder.newColumn('station_name').withTitle('Station'),
                DTColumnBuilder.newColumn('station_id').withTitle('Station ID').notVisible(),
                DTColumnBuilder.newColumn('sensor_name').withTitle('Sensor'),
                DTColumnBuilder.newColumn('sensor_id').withTitle('Station ID').notVisible(),
                DTColumnBuilder.newColumn('sensor_status_is_ok').withTitle('Status').notSortable()
            ];

        }
        
    }
    
})();
