(function() {
    
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationCamsAndPhotosStorage', locationCamsAndPhotosStorage);

    function locationCamsAndPhotosStorage() {
            
        var lightboxImagesList = [];
        
        return {
            getLightboxImagesList: getLightboxImagesList,
            setLightboxImagesList: setLightboxImagesList
        };
        
        function getLightboxImagesList() {
            return lightboxImagesList;
        }
        
        function setLightboxImagesList(data) {
            lightboxImagesList = [];
            for (var i = 0; i < data.length; i++) {
                lightboxImagesList.push({
                    'url': 'data:image/png;base64,' + data[i].photo,
                    'thumbUrl': 'data:image/png;base64,' + data[i].photo,
                    'timestamp': data[i].timestamp,
                    'stationName': data[i].station_name
                });
            }
            return lightboxImagesList
        }
        
    }

})();
