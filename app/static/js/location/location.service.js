(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocation', activeLocation);

    function activeLocation() {
        
        var activeLocation = {};
        var activeLocationLastWebcamPhoto;
        var activeLocationLiveWebcams = [];
        var activeLocationParameters = [];
        var activeLocationParametersLookup = {};
        var activeLocationStations = [];
        var activeLocationStationsLookup = {};
        var activeLocationWebcamPhotos = [];
        
        
        return {
            getActiveLocation: getActiveLocation,
            getActiveLocationLastWebcamPhoto: getActiveLocationLastWebcamPhoto,
            getActiveLocationLiveWebcams: getActiveLocationLiveWebcams,
            getActiveLocationParameters: getActiveLocationParameters,
            getActiveLocationParametersLookup: getActiveLocationParametersLookup,
            getActiveLocationStations: getActiveLocationStations,
            getActiveLocationStationsLookup: getActiveLocationStationsLookup,
            getActiveLocationWebcamPhotos: getActiveLocationWebcamPhotos,
            setActiveLocation: setActiveLocation,
            setActiveLocationLastWebcamPhoto: setActiveLocationLastWebcamPhoto,
            setActiveLocationLiveWebcams: setActiveLocationLiveWebcams,
            setActiveLocationParameters: setActiveLocationParameters,
            setActiveLocationParametersLookup: setActiveLocationParametersLookup,
            setActiveLocationStations: setActiveLocationStations,
            setActiveLocationWebcamPhotos: setActiveLocationWebcamPhotos
        };
        
        function getActiveLocation() {
            return activeLocation;
        }
        
        function getActiveLocationLastWebcamPhoto() {
            return activeLocationLastWebcamPhoto;
        }
        
        function getActiveLocationLiveWebcams() {
            return activeLocationLiveWebcams;
        }
        
        function getActiveLocationParameters() {
            return activeLocationParameters;
        }
        
        function getActiveLocationParametersLookup() {
            return activeLocationParametersLookup;
        }
        
        function getActiveLocationStations() {
            return activeLocationStations;
        }
        
        function getActiveLocationStationsLookup() {
            return activeLocationStationsLookup;
        }
        
        function getActiveLocationWebcamPhotos() {
            return activeLocationWebcamPhotos;
        }
        
        function setActiveLocation(newLocation) {
            activeLocation = newLocation;
        }
        
        function setActiveLocationStationsLookup(newStationList) {
            var stationsLookup = {};
            for (var i = 0; i < newStationList.length; i++) {
                stationsLookup[newStationList[i].station_id] = newStationList[i];
            }
            activeLocationStationsLookup = stationsLookup;
        }
        
        function setActiveLocationLastWebcamPhoto(newLastPhoto) {
            activeLocationLastWebcamPhoto = newLastPhoto;
        }
        
        function setActiveLocationLiveWebcams(newLiveWebcams) {
            activeLocationLiveWebcams = newLiveWebcams;
        }
        
        function setActiveLocationParameters(newParameters) {
            activeLocationParameters = newParameters;
            setActiveLocationParametersLookup(newParameters);
        }
        
        function setActiveLocationParametersLookup(newParameters) {
            var parametersLookup = {};
            for (var i = 0; i < newParameters.length; i++) {
                parametersLookup[newParameters[i].parameter_id] = newParameters[i];
            }
            activeLocationParametersLookup = parametersLookup;
        }
        
        function setActiveLocationStations(newStations) {
            activeLocationStations = newStations;
            setActiveLocationStationsLookup(newStations);
        }
        
        function setActiveLocationWebcamPhotos(newWebcamPhotos) {
            activeLocationWebcamPhotos = newWebcamPhotos;
        }
    }

})();
