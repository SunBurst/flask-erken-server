(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataGroupsCtrl', StationDataGroupsCtrl);
    
    
    StationDataGroupsCtrl.$inject = [
        '_groups', '_groupsObj', '_groupParameterList', '_getGroupsParameters', 
        '_groupMeasurementFrequenciesList', '_groupMeasurementFrequencies', 
        '_groupUnits', '_groupCharts', 'stationStorage', 'stationDataStorage', 'stationMeasurements'
    ];
    
    function StationDataGroupsCtrl(_groups, _groupsObj, _groupParameterList, _getGroupsParameters, _groupMeasurementFrequenciesList, _groupMeasurementFrequencies, _groupUnits, _groupCharts, stationStorage, stationDataStorage, stationMeasurements) {
        var vm = this;
        
        vm.station = stationStorage.getStation();
        vm.groups = _groups;
        vm.groupsObj = _groupsObj;
        vm.groupCharts = _groupCharts;
        vm.groupParameterList = _groupParameterList;
        vm.groupParameters = _getGroupsParameters;
        vm.groupUnits = _groupUnits;
        vm.frequencyChange = frequencyChange;
        vm.groupMeasurementFrequencies = _groupMeasurementFrequencies;
        vm.groupMeasurementFrequenciesList = _groupMeasurementFrequenciesList;
        vm.updateChart = updateChart;
        vm.query = {};
        vm.options = {
            decapitate: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        var start = moment().subtract(364, 'days').valueOf();
        var end = moment().valueOf();
        
        function frequencyChange(groupId, frequency) {
            updateChart(groupId, frequency);
        }
        
        function getDailyChartData(groupId, start, end) {
            var stationId = vm.station.id;
            var fromDate = start.valueOf();
            var toDate = end.valueOf();
            return stationMeasurements.getDailyChartParameterGroupMeasurements(stationId, groupId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyChartData(groupId, start, end) {
            var stationId = vm.station.id;
            var fromDate = start.valueOf();
            var toDate = end.valueOf();
            return stationMeasurements.getHourlyChartParameterGroupMeasurements(stationId, groupId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinuteChartData(groupId, start, end) {
            var stationId = vm.station.id;
            var fromDate = start.valueOf();
            var toDate = end.valueOf();
            return stationMeasurements.getFiveMinuteChartParameterGroupMeasurements(stationId, groupId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function updateChart(groupId, frequency) {
            if (frequency === 'Daily') {
                getDailyChartData(groupId, start, end).then(function(data) {
                    vm.groupCharts[groupId]['chartConfig'].series = [];
                    for (var i = 0; i < data.length; i++) {
                        var series = data[i];
                        var unit = series.unit;
                        var unitAxisIndex = vm.groupUnits[groupId].indexOf(unit);
                        series['yAxis'] = unitAxisIndex;
                        vm.groupCharts[groupId]['chartConfig'].series.push(series);
                    }
                });
            }
            else if (frequency === 'Hourly') {
                getHourlyChartData(groupId, start, end).then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var series = data[i];
                        vm.groupCharts[groupId]['chartConfig'].series = [];
                        vm.groupCharts[groupId]['chartConfig'].series.push(series);
                    }
                });
            }
            else if (frequency === '5 Min') {
                getFiveMinuteChartData(groupId, start, end).then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var series = data[i];
                        vm.groupCharts[groupId]['chartConfig'].series = [];
                        vm.groupCharts[groupId]['chartConfig'].series.push(series);
                    }
                });
            }
        }
        
    }
    
})();
