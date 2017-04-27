(function() {    
    'use-strict';
    
    angular
        .module('app.start')
        .factory('startStorage', startStorage);

    function startStorage() {
        
        var stationList = [];
        var stations = {};
        
        return {
            getStationList: getStationList,
            getStations: getStations,
            setStationList: setStationList,
            setStations: setStations
        };
        
        function getStationList() {
            return stationList;
        }
        
        function getStations() {
            return stations;
        }
        
        function setStationList(data, initObjects) {
            stationList = data;
            if (initObjects) {
                setStations(data);
            }
        }
        
        function setStations(data) {
            var tempStations = {};
            for (var i = 0; i < data.length; i++) {
                tempStations[data[i].station_id] = data[i];
            }
            stations = tempStations; 
        }
        
    }
    
})();
