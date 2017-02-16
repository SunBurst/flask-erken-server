(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocation', activeLocation);

    function activeLocation() {
        
        var activeLocation = {};
        var activeLocationLastWebcamPhoto;
        var activeLocationLiveWebcams = [];
        var activeLocationStations = [];
        var activeLocationWebcamPhotos = [];
        
        
        return {
            getActiveLocation: getActiveLocation,
            getActiveLocationLastWebcamPhoto: getActiveLocationLastWebcamPhoto,
            getActiveLocationLiveWebcams: getActiveLocationLiveWebcams,
            getActiveLocationStations: getActiveLocationStations,
            getActiveLocationWebcamPhotos: getActiveLocationWebcamPhotos,
            setActiveLocation: setActiveLocation,
            setActiveLocationLastWebcamPhoto: setActiveLocationLastWebcamPhoto,
            setActiveLocationLiveWebcams: setActiveLocationLiveWebcams,
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
        
        function getActiveLocationStations() {
            return activeLocationStations;
        }
        
        function getActiveLocationWebcamPhotos() {
            return activeLocationWebcamPhotos;
        }
        
        function setActiveLocation(newLocation) {
            activeLocation = newLocation;
        }
        
        function setActiveLocationLastWebcamPhoto(newLastPhoto) {
            activeLocationLastWebcamPhoto = newLastPhoto;
        }
        
        function setActiveLocationLiveWebcams(newLiveWebcams) {
            activeLocationLiveWebcams = newLiveWebcams
        }
        
        function setActiveLocationStations(newStations) {
            activeLocationStations = newStations;
        }
        
        function setActiveLocationWebcamPhotos(newWebcamPhotos) {
            activeLocationWebcamPhotos = newWebcamPhotos;
        }
    }

})();
