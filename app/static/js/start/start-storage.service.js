(function() {
    
    'use-strict';
    
    angular
        .module('app.start')
        .factory('startStorage', startStorage);

    function startStorage() {
        
        var locationList = [];
        var locations = {};
        
        return {
            getLocationList: getLocationList,
            getLocations: getLocations,
            setLocationList: setLocationList,
            setLocations: setLocations
        };
        
        function getLocationList() {
            return locationList;
        }
        
        function getLocations() {
            return locations;
        }
        
        function setLocationList(data, initObjects) {
            locationList = data;
            if (initObjects) {
                setLocations(data);
            }
        }
        
        function setLocations(data) {
            var tempLocations = {};
            for (var i = 0; i < data.length; i++) {
                tempLocations[data[i].location_id] = data[i];
            }
            locations = tempLocations; 
        }
        
    }
    
})();
