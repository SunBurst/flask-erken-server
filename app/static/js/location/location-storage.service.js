(function() {    
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationStorage', locationStorage);

    function locationStorage() {
        
        var lastWebcamPhoto;
        var liveWebcamList = [];
        var location = {};
        var parameterList = [];
        var parameters = {};
        var stationList = [];
        var stations = {};
        var statusParameters = {};
        var statusParmeterlist = [];
        var webcamPhotoList = [];
        
        return {
            getLastWebcamPhoto: getLastWebcamPhoto,
            getLiveWebcamList: getLiveWebcamList,
            getLocation: getLocation,
            getParameterList: getParameterList,
            getParameters: getParameters,
            getStationList: getStationList,
            getStations: getStations,
            getStatusParameterList: getStatusParameterList,
            getStatusParameters: getStatusParameters,
            getWebcamPhotoList: getWebcamPhotoList,
            setLocation: setLocation,
            setLastWebcamPhoto: setLastWebcamPhoto,
            setLiveWebcamList: setLiveWebcamList,
            setParameterList: setParameterList,
            setParameters: setParameters,
            setStationList: setStationList,
            setStatusParameterList: setStatusParameterList,
            setStatusParameters: setStatusParameters,
            setStations: setStations,
            setWebcamPhotosList: setWebcamPhotosList
        };
        
        function getLastWebcamPhoto() {
            return lastWebcamPhoto;
        }
        
        function getLiveWebcamList() {
            return liveWebcamList;
        }
        
        function getLocation() {
            return location;
        }
        
        function getParameterList() {
            return parameterList;
        }
        
        function getParameters() {
            return parameters;
        }
        
        function getStationList() {
            return stationList;
        }
        
        function getStations() {
            return stations;
        }
        
        function getStatusParameterList() {
            return statusParameterList;
        }
        
        function getStatusParameters() {
            return statusParameters;
        }
        
        function getWebcamPhotoList() {
            return webcamPhotoList;
        }
        
        function setLastWebcamPhoto(data) {
            lastWebcamPhoto = data;
        }
        
        function setLiveWebcamList(newLiveWebcams) {
            liveWebcamList = newLiveWebcams;
        }
        
        function setLocation(data) {
            location = data;
        }
        
        function setParameterList(data, initObjects) {
            parameterList = data;
            if (initObjects) {
                setParameters(data);
            }
        }
        
        function setParameters(data) {
            var tempParameters = {};
            for (var i = 0; i < data.length; i++) {
                tempParameters[data[i].parameter_id] = data[i];
            }
            parameters = tempParameters;
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
        
        function setStatusParameterList(data, initObjects) {
            statusParameterList = data;
            if (initObjects) {
                setStatusParameters(data);
            }
        }
        
        function setStatusParameters(data) {
            var tempParameters = {};
            for (var i = 0; i < data.length; i++) {
                tempParameters[data[i].parameter_id] = data[i];
            }
            statusParameters = tempParameters;
        }
        
        function setWebcamPhotosList(data) {
            webcamPhotoList = data;
        }
    
    }

})();
